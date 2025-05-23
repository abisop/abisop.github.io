import{_ as t,c as i,al as o,o as n}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"README.txt","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/z16/z16f/boards/z16f2800100zcog/README.md","filePath":"en/platforms/z16/z16f/boards/z16f2800100zcog/README.md"}'),a={name:"en/platforms/z16/z16f/boards/z16f2800100zcog/README.md"};function s(r,e,l,c,h,u){return n(),i("div",null,e[0]||(e[0]=[o(`<h1 id="readme-txt" tabindex="-1">README.txt <a class="header-anchor" href="#readme-txt" aria-label="Permalink to &quot;README.txt&quot;">​</a></h1><p>This is the README file for the NuttX port to the ZiLog ZNEO MCU.</p><ul><li><p>Console output is on UART0.</p></li><li><p>NOTE: My board has a 20MHz crystal, but I have heard of other boards with 18.432MHz crystals. If you board has a diff crystal installed, then modify the system frequency in include/board.h.</p></li></ul><h1 id="contents" tabindex="-1">Contents <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;Contents&quot;">​</a></h1><ul><li>ZDS-II Compiler Versions</li><li>Patches</li><li>Serial Console</li><li>Selecting Configurations</li><li>Configuration Sub-directories</li></ul><h1 id="zds-ii-compiler-versions" tabindex="-1">ZDS-II Compiler Versions <a class="header-anchor" href="#zds-ii-compiler-versions" aria-label="Permalink to &quot;ZDS-II Compiler Versions&quot;">​</a></h1><p>Version 4.10.2</p><p>The ZDS-II version 4.10.2 will not compile NuttX. It reports &quot;internal errors&quot; on some of the files. Upgrades to ZDS-II are available for download from the Zilog website: <a href="http://www.zilog.com/software/zds2.asp" target="_blank" rel="noreferrer">http://www.zilog.com/software/zds2.asp</a></p><p>Version 4.11.0</p><p>NuttX compiles correctly with the newer 4.11.0 version of the ZDS-II toolchain. However, I have found a few issues:</p><ul><li><p>The code will not run without the -reduceopt option. There is, apparently, some optimization related issue. This issue has not been analyzed as of this writing.</p></li><li><p>Not all NuttX logic will not run with the -regvars option. There is at least one failure that has been reported to ZiLOG as incident 81400.</p></li></ul><p>Version 4.11.1</p><p>As of this writing (30 September 2010), the latest release of ZDS-II for the ZNEO is 4.11.1. It is unknown if this release includes fixes for incidents 81400 and 81459 or not. It is unknown if the code will run without -reduceopt either. (Basically, it compiles with 4.11.1, but is untested with that version).</p><p>Version 4.12.0</p><p>Never tested</p><p>Version 5.0.0</p><p>Never tested</p><p>Version 5.0.1</p><p>On November 29, 2012, all of the z16f configurations were converted to use 5.0.1, but have not been verified on a running target.</p><p>Paths were also updated that are specific to a 32-bit toolchain running on a 64 bit windows platform. Change to a different toolchain, you will need to modify the versioning in the Make.defs file; if you want to build on a different platform, you will need to change the path in the ZDS binaries in those that file and your PATH environment variable.</p><p>Version 5.2.1 On June 2, 2019, support for the 5.2.1 ZDS-II toolchain was added. I started verification using 5.30 on June 2, 2019. To use this toolchain, I had to suppress the gmtime() and gmtimer() because these were causing an internal compiler error:</p><pre><code>time\\lib_gmtimer.c
P2: Internal Error(0xB47E59):
        Please contact Technical Support
</code></pre><p>This is the change to suppress building these files:</p><pre><code>diff --git a/libs/libc/time/Make.defs b/libs/libc/time/Make.defs
index 2a26d556ff..08fd0b7bcd 100644
--- a/libs/libc/time/Make.defs
+++ b/libs/libc/time/Make.defs
@@ -44,7 +44,7 @@ CSRCS += lib_asctime.c lib_asctimer.c lib_ctime.c lib_ctimer.c
 ifdef CONFIG_LIBC_LOCALTIME
 CSRCS += lib_localtime.c
 else
-CSRCS += lib_mktime.c lib_gmtime.c lib_gmtimer.c
+CSRCS += lib_mktime.c #lib_gmtime.c lib_gmtimer.c
 endif
</code></pre><p>The consequence is, of course, that these interfaces will not be available to applications.</p><p>Another issue is that the ZDS-II version of stdarg.h does not provide va_copy(). This affects libs/libc/lib_sysloc.c.</p><p>There are a few outstanding build issues, but it seems close enough for the time being.</p><p>Version 5.2.2 Verified April 29, 2020. No serious compilation issues were encountered.</p><p>Other Versions</p><p>If you use any version of ZDS-II or if you install ZDS-II at any location other than the default location, you will have to modify arch/z16/src/z16f/Kconfig and boards/z16/z16f/z16f2800100zcog/scripts/Make.defs. Simply edit that file, changing 5.0.1 to whatever.</p><h1 id="patches" tabindex="-1">Patches <a class="header-anchor" href="#patches" aria-label="Permalink to &quot;Patches&quot;">​</a></h1><p>A bug has been found in the ZDS-II toolchain version 5.0.1. a patch is available to work around the bug. A summary of the nature the bug and instructions for applying the patch follow.</p><p>Parameters are passed different to variadic functions (i.e., functions that accept a varying number of parameters) than to regular functions. For most functions, parameters are passed in registers, beginning with R1. But for variadic functions, all parameters must be passed on the stack.</p><p>The logic works correctly for global functions, local functions, and most function pointers. It does not work correctly for the case where a variadic function point is included within a structure. In that case, the caller inappropriately passes the parameters in registers; the receiver will attempt to recover the parameters from the stack and a failure then follows.</p><p>This bug prevents the use of NSH with the ZNEO. However, a patch has been developed that works around the problem. That patch can be found at boards/z16/z16f/z16f2800100zcog/tools/zneo-zdsii-5_0_1-variadic-func-fix.patch. In that directory is also a bash script that will apply that patch for you.</p><p>The patch would be applied when NuttX is configured as follows:</p><p>tools/configure.sh z16f2800100zcog:nsh dopatch.sh make</p><p>The patch can also be removed with:</p><p>dopatch.sh -R</p><p>See the section &quot;Selecting Configurations&quot; below.</p><h1 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h1><p>By default, console output is on UART1 which corresponds to the DB9 connector labelled CONSOLE.</p><p>UART1 is also available on JP2:</p><p>MCU PIN GPIO JP2 Pin 86 TXD1 PD5 JP2 Pin 26 Pin 87 RXD1 PD4 JP2 Pin 27 Vcc JP2 Pin 59 GND JP2 Pins 19, 39, 46, 48, 56</p><h1 id="selecting-configurations" tabindex="-1">Selecting Configurations <a class="header-anchor" href="#selecting-configurations" aria-label="Permalink to &quot;Selecting Configurations&quot;">​</a></h1><p>Variations on the basic z8f162800100zcog configuration are maintained in subdirectories. To configure any specific configuration, do the following steps:</p><p>tools/configure.sh z16f2800100zcog:<code>&lt;sub-directory&gt;</code> make</p><p>Where <code>&lt;sub-directory&gt;</code> is the specific board configuration that you wish to build. The following board-specific configurations are available. You may also need to apply a path to NuttX before making. Please refer the section &quot;Patches&quot; above&quot;</p><h1 id="configuration-sub-directories" tabindex="-1">Configuration Sub-directories <a class="header-anchor" href="#configuration-sub-directories" aria-label="Permalink to &quot;Configuration Sub-directories&quot;">​</a></h1><h2 id="source-and-include" tabindex="-1">source/ and include/ <a class="header-anchor" href="#source-and-include" aria-label="Permalink to &quot;source/ and include/&quot;">​</a></h2><p>These directories contain common logic for all z16f2800100zcog configurations.</p><h2 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h2><p>nsh: This configuration directory will built the NuttShell (NSH). See the NSH user manual in the documents directory (or online at apache.nuttx.org). See also the README.txt file in the nsh sub-directory for information about using ZDS-II.</p><pre><code>NOTES:

1. This configuration uses the mconf-based configuration tool.  To
   change this configuration using that tool, you should:

   a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
      see additional README.txt files in the NuttX tools repository.

   b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
      reconfiguration process.

2. By default, this configuration assumes that you are using the
   Cygwin environment on Windows.  An option is to use the native
   CMD.exe window build as described in the top-level README.txt
   file.  To set up that configuration:

   -CONFIG_WINDOWS_CYGWIN=y
   +CONFIG_WINDOWS_NATIVE=y

   And after configuring, make sure that CONFIG_APPS_DIR uses
   the back slash character.  For example:

    CONFIG_APPS_DIR=&quot;..\\apps&quot;

  NOTES:

  a. If you need to change the toolchain path used in Make.defs, you
     will need to use the short 8.3 filenames to avoid spaces.  On my
     PC, C:\\PROGRA~1\\ is is C:\\Program Files\\ and C:\\PROGRA~2\\ is
     C:\\Program Files (x86)\\
  b. I have not tried to use this configuration with the native
     Windows build, but I would expect the same issues as is listed
     for the ostest configuration..
</code></pre><p>STATUS:</p><pre><code> 1. Note that you must apply the ZNEO patch if you are using ZDS-II 5.0.1.
    See the README.txt file in the parent directory for more information.
    The configuration will run correctly with the patch applied.
</code></pre><h2 id="ostest" tabindex="-1">ostest <a class="header-anchor" href="#ostest" aria-label="Permalink to &quot;ostest&quot;">​</a></h2><pre><code>This builds the examples/ostest application for execution from FLASH.
See the README.txt file in the ostest sub-directory for information
about using ZDS-II.  See also apps/examples/README.txt for information
about ostest.

NOTES:

1. This configuration uses the mconf-based configuration tool.  To
   change this configuration using that tool, you should:

   a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
      see additional README.txt files in the NuttX tools repository.

   b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
      reconfiguration process.

2. By default, this configuration assumes that you are using the
   Cygwin environment on Windows.  An option is to use the native
   CMD.exe window build as described in the top-level README.txt
   file.  To set up that configuration:

   -CONFIG_WINDOWS_CYGWIN=y
   +CONFIG_WINDOWS_NATIVE=y

   And after configuring, make sure that CONFIG_APPS_DIR uses
   the back slash character.  For example:

    CONFIG_APPS_DIR=&quot;..\\apps&quot;

  NOTES:

  a. If you need to change the toolchain path used in Make.defs, you
     will need to use the short 8.3 filenames to avoid spaces.  On my
     PC, C:\\PROGRA~1\\ is is C:\\Program Files\\ and C:\\PROGRA~2\\ is
     C:\\Program Files (x86)\\
  b. At present, the native Windows build fails at the final link stages.
     The failure is due to problems in arch/z16/src/nuttx.linkcmd that
     is autogenerated by arch/z16/src/Makefile.  The basic problem
     is the spurious spaces and and carriage returns are generated at
     the end of the lines after a line continuation (\\ ^M).  If these
     trailing bad characters are manually eliminated, then the build
     will succeed on the next try.
</code></pre><p>Check out any README.txt files in these <code>&lt;sub-directory&gt;</code>s.</p>`,59)]))}const f=t(a,[["render",s]]);export{p as __pageData,f as default};
