@if "%DEBUG%" == "" @echo off
@rem ##########################################################################
@rem
@rem  cirya startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%..

@rem Add default JVM options here. You can also use JAVA_OPTS and CIRYA_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS="-Dgreeting.language=en"

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if "%ERRORLEVEL%" == "0" goto init

echo.
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto init

echo.
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:init
@rem Get command-line arguments, handling Windows variants

if not "%OS%" == "Windows_NT" goto win9xME_args

:win9xME_args
@rem Slurp the command line arguments.
set CMD_LINE_ARGS=
set _SKIP=2

:win9xME_args_slurp
if "x%~1" == "x" goto execute

set CMD_LINE_ARGS=%*

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\lib\aerospike-cirya-cli-3.0-SNAPSHOT.jar;%APP_HOME%\lib\aerospike-cirya-client-3.0-SNAPSHOT.jar;%APP_HOME%\lib\swagger;%APP_HOME%\lib\swagger;%APP_HOME%\lib\guice-assistedinject-4.1.0.jar;%APP_HOME%\lib\guice-multibindings-4.1.0.jar;%APP_HOME%\lib\guice-4.1.0.jar;%APP_HOME%\lib\commons-lang3-3.0.1.jar;%APP_HOME%\lib\logback-classic-1.0.13.jar;%APP_HOME%\lib\slf4j-api-1.7.5.jar;%APP_HOME%\lib\jersey-client-2.27.jar;%APP_HOME%\lib\jersey-media-multipart-2.27.jar;%APP_HOME%\lib\jersey-media-json-jackson-2.27.jar;%APP_HOME%\lib\jersey-hk2-2.27.jar;%APP_HOME%\lib\jersey-common-2.27.jar;%APP_HOME%\lib\hk2-locator-2.5.0-b42.jar;%APP_HOME%\lib\hk2-api-2.5.0-b42.jar;%APP_HOME%\lib\hk2-utils-2.5.0-b42.jar;%APP_HOME%\lib\javax.annotation-api-1.3.1.jar;%APP_HOME%\lib\kotlin-stdlib-jdk8-1.2.51.jar;%APP_HOME%\lib\picocli-3.1.0.jar;%APP_HOME%\lib\commons-io-2.6.jar;%APP_HOME%\lib\nailgun-all-0.9.3-SNAPSHOT.jar;%APP_HOME%\lib\logback-core-1.0.13.jar;%APP_HOME%\lib\javax.inject-1.jar;%APP_HOME%\lib\aopalliance-1.0.jar;%APP_HOME%\lib\guava-19.0.jar;%APP_HOME%\lib\kotlin-stdlib-jdk7-1.2.51.jar;%APP_HOME%\lib\kotlin-stdlib-1.2.51.jar;%APP_HOME%\lib\jackson-datatype-joda-2.1.5.jar;%APP_HOME%\lib\jackson-datatype-jsr310-2.9.6.jar;%APP_HOME%\lib\jackson-module-jaxb-annotations-2.8.10.jar;%APP_HOME%\lib\jackson-databind-2.9.6.jar;%APP_HOME%\lib\jackson-core-2.9.6.jar;%APP_HOME%\lib\jackson-annotations-2.9.6.jar;%APP_HOME%\lib\javax.activation-1.2.0.jar;%APP_HOME%\lib\kotlin-stdlib-common-1.2.51.jar;%APP_HOME%\lib\annotations-13.0.jar;%APP_HOME%\lib\jersey-entity-filtering-2.27.jar;%APP_HOME%\lib\javax.ws.rs-api-2.1.jar;%APP_HOME%\lib\javax.inject-2.5.0-b42.jar;%APP_HOME%\lib\mimepull-1.9.6.jar;%APP_HOME%\lib\joda-time-2.1.jar;%APP_HOME%\lib\osgi-resource-locator-1.0.1.jar;%APP_HOME%\lib\aopalliance-repackaged-2.5.0-b42.jar;%APP_HOME%\lib\javassist-3.22.0-CR2.jar

@rem Execute cirya
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %CIRYA_OPTS%  -classpath "%CLASSPATH%" com.aerospike.cirya.cli.CiryaCliKt %CMD_LINE_ARGS%

:end
@rem End local scope for the variables with windows NT shell
if "%ERRORLEVEL%"=="0" goto mainEnd

:fail
rem Set variable CIRYA_EXIT_CONSOLE if you need the _script_ return code instead of
rem the _cmd.exe /c_ return code!
if  not "" == "%CIRYA_EXIT_CONSOLE%" exit 1
exit /b 1

:mainEnd
if "%OS%"=="Windows_NT" endlocal

:omega
