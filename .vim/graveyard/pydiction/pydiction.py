#!/usr/bin/env python
# Last modified: July 23rd, 2009
"""

pydiction.py 1.2 by Ryan Kulla (rkulla AT gmail DOT com).

Description: Creates a Vim dictionary of Python module attributes for Vim's 
             completion feature.  The created dictionary file is used by
             the Vim ftplugin "python_pydiction.vim".

Usage: pydiction.py <module> ... [-v]
Example: The following will append all the "time" and "math" modules'
         attributes to a file, in the current directory, called "pydiction"
         with and without the "time." and "math." prefix:
             $ python pydiction.py time math
         To print the output just to stdout, instead of appending to the file, 
         supply the -v option: 
             $ python pydiction.py -v time math

License: BSD.
"""


__author__ = "Ryan Kulla (rkulla AT gmail DOT com)"
__version__ = "1.2"
__copyright__ = "Copyright (c) 2003-2009 Ryan Kulla"


import os
import sys
import types
import shutil


# Path/filename of the vim dictionary file to write to:
PYDICTION_DICT = r'complete-dict'
# Path/filename of the vim dictionary backup file:
PYDICTION_DICT_BACKUP = r'complete-dict.last'

# Sentintal to test if we should only output to stdout:
STDOUT_ONLY = False


def get_submodules(module_name, submodules):
    """Build a list of all the submodules of modules."""

    # Try to import a given module, so we can dir() it:
    try:
        imported_module = my_import(module_name)
    except ImportError, err:
        return submodules

    mod_attrs = dir(imported_module)

    for mod_attr in mod_attrs:
        if type(getattr(imported_module, mod_attr)) is types.ModuleType:
            submodules.append(module_name + '.' + mod_attr)

    return submodules


def write_dictionary(module_name):
    """Write to module attributes to the vim dictionary file."""
    prefix_on = '%s.%s'
    prefix_on_callable = '%s.%s('
    prefix_off = '%s'
    prefix_off_callable = '%s('

    try:
        imported_module = my_import(module_name)
    except ImportError, err:
        return

    mod_attrs = dir(imported_module)

    # Generate fully-qualified module names: 
    write_to.write('\n--- import %s ---\n' % module_name)
    for mod_attr in mod_attrs:
        if callable(getattr(imported_module, mod_attr)):
            # If an attribute is callable, show an opening parentheses:
            format = prefix_on_callable
        else:
            format = prefix_on
        write_to.write(format % (module_name, mod_attr) + '\n')

    # Generate submodule names by themselves, for when someone does
    # "from foo import bar" and wants to complete bar.baz.
    # This works the same no matter how many .'s are in the module.
    if module_name.count('.'):
        # Get the "from" part of the module. E.g., 'xml.parsers'
        # if the module name was 'xml.parsers.expat':
        first_part = module_name[:module_name.rfind('.')]
        # Get the "import" part of the module. E.g., 'expat'
        # if the module name was 'xml.parsers.expat'
        second_part = module_name[module_name.rfind('.') + 1:]
        write_to.write('\n--- from %s import %s ---\n' % 
                       (first_part, second_part))
        for mod_attr in mod_attrs:
            if callable(getattr(imported_module, mod_attr)):
                format = prefix_on_callable
            else:
                format = prefix_on
            write_to.write(format % (second_part, mod_attr) + '\n')

    # Generate non-fully-qualified module names: 
    write_to.write('\n--- from %s import * ---\n' % module_name)
    for mod_attr in mod_attrs:
        if callable(getattr(imported_module, mod_attr)):
            format = prefix_off_callable
        else:
            format = prefix_off
        write_to.write(format % mod_attr + '\n')


def my_import(name):
    """Make __import__ import "package.module" formatted names."""
    mod = __import__(name)
    components = name.split('.')
    for comp in components[1:]:
        mod = getattr(mod, comp)
    return mod


def remove_duplicates(seq, keep=()):
    """

    Remove duplicates from a sequence while perserving order.

    The optional tuple argument "keep" can be given to specificy 
    each string you don't want to be removed as a duplicate.
    """
    seq2 = []
    seen = set();
    for i in seq:
        if i in (keep):
            seq2.append(i)
            continue
        elif i not in seen:
            seq2.append(i)
        seen.add(i)
    return seq2


def get_yesno(msg="[Y/n]?"):
    """
    
    Returns True if user inputs 'n', 'Y', "yes", "Yes"...
    Returns False if user inputs 'n', 'N', "no", "No"...
    If they enter an invalid option it tells them so and asks again.
    Hitting Enter is equivalent to answering Yes.
    Takes an optional message to display, defaults to "[Y/n]?".

    """
    while True:
        answer = raw_input(msg)
        if answer == '':
            return True
        elif len(answer):
            answer = answer.lower()[0]
            if answer == 'y':
                return True
                break
            elif answer == 'n':
                return False
                break
            else:
                print "Invalid option. Please try again."
                continue


def main(write_to):
    """Generate a dictionary for Vim of python module attributes."""
    submodules = []

    for module_name in sys.argv[1:]:
        try:
            imported_module = my_import(module_name)
        except ImportError, err:
            print "Couldn't import: %s. %s" % (module_name, err)
            sys.argv.remove(module_name)

    cli_modules = sys.argv[1:]

    # Step through each command line argument:
    for module_name in cli_modules:
        print "Trying module: %s" % module_name
        submodules = get_submodules(module_name, submodules)

        # Step through the current module's submodules:
        for submodule_name in submodules:
            submodules = get_submodules(submodule_name, submodules)

    # Add the top-level modules to the list too:
    for module_name in cli_modules:
        submodules.append(module_name)

    submodules.sort()

    # Step through all of the modules and submodules to create the dict file:
    for submodule_name in submodules:
        write_dictionary(submodule_name)

    if STDOUT_ONLY:
        return

    # Close and Reopen the file for reading and remove all duplicate lines:
    write_to.close()
    print "Removing duplicates..."
    f = open(PYDICTION_DICT, 'r')
    file_lines = f.readlines()
    file_lines = remove_duplicates(file_lines, ('\n'))
    f.close()

    # Delete the original file:
    os.unlink(PYDICTION_DICT)
    
    # Recreate the file, this time it won't have any duplicates lines:
    f = open(PYDICTION_DICT, 'w')
    for attr in file_lines:
        f.write(attr)
    f.close()
    print "Done."


if __name__ == '__main__':
    """Process the command line."""

    if sys.version_info[0:2] < (2, 3):
        sys.exit("You need a Python 2.x version of at least Python 2.3")

    if len(sys.argv) <= 1:
        sys.exit("%s requires at least one argument. None given." % 
                  sys.argv[0])

    if '-v' in sys.argv:
        write_to = sys.stdout
        sys.argv.remove('-v')
        STDOUT_ONLY = True
    elif os.path.exists(PYDICTION_DICT):
            # See if any of the given modules have already been pydiction'd:
            f = open(PYDICTION_DICT, 'r')
            file_lines = f.readlines()
            for module_name in sys.argv[1:]:
                for line in file_lines:
                    if line.find('--- import %s ' % module_name) != -1:
                        print '"%s" already exists in %s. Skipping...' % \
                               (module_name, PYDICTION_DICT)
                        sys.argv.remove(module_name)
                        break
            f.close()

            if len(sys.argv) < 2:
                # Check if there's still enough command-line arguments:
                sys.exit("Nothing new to do. Aborting.")
            
            if os.path.exists(PYDICTION_DICT_BACKUP):
                answer = get_yesno('Overwrite existing backup "%s" [Y/n]? ' % \
                                    PYDICTION_DICT_BACKUP)
                if (answer):
                    print "Backing up old dictionary to: %s" % \
                           PYDICTION_DICT_BACKUP
                    try:
                        shutil.copyfile(PYDICTION_DICT, PYDICTION_DICT_BACKUP)
                    except IOError, err:
                        print "Couldn't back up %s. %s" % (PYDICTION_DICT, err)
                else:
                    print "Skipping backup..."

                print 'Appending to: "%s"' % PYDICTION_DICT
            else:
                print "Backing up current %s to %s" % \
                       (PYDICTION_DICT, PYDICTION_DICT_BACKUP)
                try:
                    shutil.copyfile(PYDICTION_DICT, PYDICTION_DICT_BACKUP)
                except IOError, err:
                    print "Couldn't back up %s. %s" % (PYDICTION_DICT, err)
    else:
        print 'Creating file: "%s"' % PYDICTION_DICT


    if not STDOUT_ONLY:
        write_to = open(PYDICTION_DICT, 'a')

    main(write_to)
