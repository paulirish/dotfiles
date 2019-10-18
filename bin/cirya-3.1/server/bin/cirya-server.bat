@if "%DEBUG%" == "" @echo off
@rem ##########################################################################
@rem
@rem  cirya-server startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%..

@rem Add default JVM options here. You can also use JAVA_OPTS and CIRYA_SERVER_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS="-Dgreeting.language=en" "-Djava.util.concurrent.ForkJoinPool.common.parallelism=1024" "-Djava.security.egd=file:/dev/./urandom"

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

set CLASSPATH=%APP_HOME%\lib\aerospike-cirya-server-3.1-SNAPSHOT.jar;%APP_HOME%\lib\aerospike-cirya-java-3.1-SNAPSHOT.jar;%APP_HOME%\lib\alchemy-inject-json-1.1.jar;%APP_HOME%\lib\alchemy-inject-1.1.jar;%APP_HOME%\lib\docker-2.0.0.jar;%APP_HOME%\lib\jclouds-sshj-2.0.0.jar;%APP_HOME%\lib\jclouds-slf4j-2.0.0.jar;%APP_HOME%\lib\jclouds-enterprise-2.0.0.jar;%APP_HOME%\lib\google-compute-engine-2.0.0.jar;%APP_HOME%\lib\openstack-nova-2.0.0.jar;%APP_HOME%\lib\aws-ec2-2.0.0.jar;%APP_HOME%\lib\ec2-2.0.0.jar;%APP_HOME%\lib\jclouds-compute-2.0.0.jar;%APP_HOME%\lib\jclouds-bouncycastle-2.0.0.jar;%APP_HOME%\lib\jclouds-joda-2.0.0.jar;%APP_HOME%\lib\jclouds-netty-2.0.0.jar;%APP_HOME%\lib\openstack-keystone-2.0.0.jar;%APP_HOME%\lib\jclouds-okhttp-2.0.0.jar;%APP_HOME%\lib\jclouds-scriptbuilder-2.0.0.jar;%APP_HOME%\lib\googlecloud-2.0.0.jar;%APP_HOME%\lib\oauth-2.0.0.jar;%APP_HOME%\lib\sts-2.0.0.jar;%APP_HOME%\lib\jclouds-core-2.0.0.jar;%APP_HOME%\lib\guice-assistedinject-4.1.0.jar;%APP_HOME%\lib\guice-multibindings-4.1.0.jar;%APP_HOME%\lib\resteasy-guice-3.6.0.Final.jar;%APP_HOME%\lib\guice-4.1.0.jar;%APP_HOME%\lib\swagger-jaxrs-1.5.20.jar;%APP_HOME%\lib\swagger-core-1.5.20.jar;%APP_HOME%\lib\commons-lang3-3.2.1.jar;%APP_HOME%\lib\logback-classic-1.0.13.jar;%APP_HOME%\lib\sshj-0.19.0.jar;%APP_HOME%\lib\swagger-models-1.5.20.jar;%APP_HOME%\lib\slf4j-api-1.7.22.jar;%APP_HOME%\lib\jersey-client-2.25.1.jar;%APP_HOME%\lib\jersey-common-2.25.1.jar;%APP_HOME%\lib\javax.annotation-api-1.3.1.jar;%APP_HOME%\lib\kotlin-stdlib-jdk8-1.3.10.jar;%APP_HOME%\lib\resteasy-servlet-initializer-3.6.0.Final.jar;%APP_HOME%\lib\resteasy-undertow-3.5.1.Final.jar;%APP_HOME%\lib\resteasy-client-3.6.0.Final.jar;%APP_HOME%\lib\resteasy-jaxrs-3.6.0.Final.jar;%APP_HOME%\lib\resteasy-jaxb-provider-3.6.0.Final.jar;%APP_HOME%\lib\resteasy-jackson2-provider-3.6.0.Final.jar;%APP_HOME%\lib\webjars-servlet-2.x-1.5.jar;%APP_HOME%\lib\caffeine-2.6.2.jar;%APP_HOME%\lib\picocli-3.1.0.jar;%APP_HOME%\lib\logback-core-1.0.13.jar;%APP_HOME%\lib\hk2-locator-2.5.0-b32.jar;%APP_HOME%\lib\hk2-api-2.5.0-b32.jar;%APP_HOME%\lib\hk2-utils-2.5.0-b32.jar;%APP_HOME%\lib\javax.inject-1.jar;%APP_HOME%\lib\aopalliance-1.0.jar;%APP_HOME%\lib\auto-service-1.0-rc3.jar;%APP_HOME%\lib\reflections-0.9.11.jar;%APP_HOME%\lib\auto-common-0.3.jar;%APP_HOME%\lib\json-patch-1.3.jar;%APP_HOME%\lib\jackson-coreutils-1.0.jar;%APP_HOME%\lib\guava-20.0.jar;%APP_HOME%\lib\commons-exec-1.3.jar;%APP_HOME%\lib\commons-io-2.6.jar;%APP_HOME%\lib\commons-configuration-1.10.jar;%APP_HOME%\lib\commons-lang-2.6.jar;%APP_HOME%\lib\commons-compress-1.18.jar;%APP_HOME%\lib\httpclient-4.5.4.jar;%APP_HOME%\lib\commons-codec-1.10.jar;%APP_HOME%\lib\commons-pool2-2.4.2.jar;%APP_HOME%\lib\commons-collections4-4.1.jar;%APP_HOME%\lib\jackson-jaxrs-json-provider-2.9.5.jar;%APP_HOME%\lib\jackson-jaxrs-base-2.9.5.jar;%APP_HOME%\lib\jackson-module-jaxb-annotations-2.9.5.jar;%APP_HOME%\lib\jackson-databind-2.9.5.jar;%APP_HOME%\lib\jackson-dataformat-yaml-2.9.5.jar;%APP_HOME%\lib\freemarker-2.3.23.jar;%APP_HOME%\lib\auto-value-1.5.2.jar;%APP_HOME%\lib\aerospike-client-4.1.6.jar;%APP_HOME%\lib\jython-2.5.3.jar;%APP_HOME%\lib\kotlin-stdlib-jdk7-1.3.10.jar;%APP_HOME%\lib\kotlin-stdlib-1.3.10.jar;%APP_HOME%\lib\jboss-jaxrs-api_2.1_spec-1.0.0.Final.jar;%APP_HOME%\lib\jboss-jaxb-api_2.3_spec-1.0.0.Final.jar;%APP_HOME%\lib\reactive-streams-1.0.2.jar;%APP_HOME%\lib\validation-api-1.1.0.Final.jar;%APP_HOME%\lib\undertow-servlet-1.4.18.Final.jar;%APP_HOME%\lib\jboss-annotations-api_1.2_spec-1.0.0.Final.jar;%APP_HOME%\lib\activation-1.1.1.jar;%APP_HOME%\lib\jcip-annotations-1.0.jar;%APP_HOME%\lib\javax.json.bind-api-1.0.jar;%APP_HOME%\lib\undertow-core-1.4.18.Final.jar;%APP_HOME%\lib\jboss-logging-3.3.1.Final.jar;%APP_HOME%\lib\jaxb-core-2.3.0.jar;%APP_HOME%\lib\jaxb-impl-2.3.0.jar;%APP_HOME%\lib\jackson-core-2.9.5.jar;%APP_HOME%\lib\jackson-annotations-2.9.5.jar;%APP_HOME%\lib\jsr311-api-1.1.1.jar;%APP_HOME%\lib\snakeyaml-1.18.jar;%APP_HOME%\lib\javax.ws.rs-api-2.0.1.jar;%APP_HOME%\lib\javax.inject-2.5.0-b32.jar;%APP_HOME%\lib\jsch.agentproxy.sshj-0.0.9.jar;%APP_HOME%\lib\jsch.agentproxy.connector-factory-0.0.9.jar;%APP_HOME%\lib\bcpkix-jdk15on-1.51.jar;%APP_HOME%\lib\bcprov-jdk15on-1.51.jar;%APP_HOME%\lib\jzlib-1.1.3.jar;%APP_HOME%\lib\eddsa-0.1.0.jar;%APP_HOME%\lib\gnu-crypto-2.0.1.jar;%APP_HOME%\lib\luaj-jse-3.0.jar;%APP_HOME%\lib\jbcrypt-0.3m.jar;%APP_HOME%\lib\kotlin-stdlib-common-1.3.10.jar;%APP_HOME%\lib\annotations-13.0.jar;%APP_HOME%\lib\httpcore-4.4.7.jar;%APP_HOME%\lib\commons-logging-1.2.jar;%APP_HOME%\lib\jboss-servlet-api_3.1_spec-1.0.0.Final.jar;%APP_HOME%\lib\xnio-nio-3.3.8.Final.jar;%APP_HOME%\lib\xnio-api-3.3.8.Final.jar;%APP_HOME%\lib\javassist-3.21.0-GA.jar;%APP_HOME%\lib\jersey-guava-2.25.1.jar;%APP_HOME%\lib\osgi-resource-locator-1.0.1.jar;%APP_HOME%\lib\aopalliance-repackaged-2.5.0-b32.jar;%APP_HOME%\lib\jsr250-api-1.0.jar;%APP_HOME%\lib\gson-2.5.jar;%APP_HOME%\lib\bcprov-ext-jdk15on-1.51.jar;%APP_HOME%\lib\jsch.agentproxy.usocket-jna-0.0.9.jar;%APP_HOME%\lib\jsch.agentproxy.usocket-nc-0.0.9.jar;%APP_HOME%\lib\jsch.agentproxy.sshagent-0.0.9.jar;%APP_HOME%\lib\jsch.agentproxy.pageant-0.0.9.jar;%APP_HOME%\lib\jsch.agentproxy.core-0.0.9.jar;%APP_HOME%\lib\joda-time-2.1.jar;%APP_HOME%\lib\netty-3.5.9.Final.jar;%APP_HOME%\lib\okhttp-2.2.0.jar;%APP_HOME%\lib\swagger-annotations-1.5.20.jar;%APP_HOME%\lib\jna-platform-4.1.0.jar;%APP_HOME%\lib\jna-4.1.0.jar;%APP_HOME%\lib\okio-1.2.0.jar

@rem Execute cirya-server
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %CIRYA_SERVER_OPTS%  -classpath "%CLASSPATH%" com.aerospike.cirya.server.CiryaHttpServerKt %CMD_LINE_ARGS%

:end
@rem End local scope for the variables with windows NT shell
if "%ERRORLEVEL%"=="0" goto mainEnd

:fail
rem Set variable CIRYA_SERVER_EXIT_CONSOLE if you need the _script_ return code instead of
rem the _cmd.exe /c_ return code!
if  not "" == "%CIRYA_SERVER_EXIT_CONSOLE%" exit 1
exit /b 1

:mainEnd
if "%OS%"=="Windows_NT" endlocal

:omega
