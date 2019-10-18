#!/bin/sh

destdir=$2
fullfile=$(realpath $1)
filename=$(basename -- $fullfile)
name=${filename%.*}

echo "using ${destdir}/${name} as base directory path"
mkdir -p $destdir
cd $destdir;

mkdir -p $name;
cd $name;

unzip $fullfile;
tarballs=$(find . -name \*.tgz)

while [ "${tarballs}" ] 
do
for tarball in ${tarballs}
do 
    tardirtmp=${tarball%.*}
    tardir="${tardirtmp%%[0-9]*}.dir"
    echo "doing a ${tardir} from ${tarball}"
    mkdir ${tardir} && tar xvfz ${tarball} -C ${tardir}
    rm ${tarball}
done
tarballs=$(find . -name \*.tgz)
done




