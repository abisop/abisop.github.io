import{_ as n,c as o,al as t,o as i}from"./chunks/framework.NFAqBSgQ.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/z80/z80/boards/z80sim/README.md","filePath":"en/platforms/z80/z80/boards/z80sim/README.md"}'),r={name:"en/platforms/z80/z80/boards/z80sim/README.md"};function s(a,e,u,l,c,h){return i(),o("div",null,e[0]||(e[0]=[t(`<p>z80sim README ^^^^^^^^^^^^^</p><p>This port uses a primitive, emulated Z80 and the SDCC toolchain. This port uses an instruction set simulator called z80sim.</p><p>The SDCC toolchain is available from <a href="http://sdcc.sourceforge.net/" target="_blank" rel="noreferrer">http://sdcc.sourceforge.net/</a>. All testing has been performed using version 2.6.0 of the SDCC toolchain. IMPORTANT: See notes in the SDCC section.</p><p>Contents ^^^^^^^^</p><p>o Configuring NuttX o Reconfiguring NuttX o Reconfiguring for Windows Native, Cygwin, or macOS o SDCC o Building the SDCC toolchain</p><p>Configuring NuttX ^^^^^^^^^^^^^^^^^</p><p>ostest</p><pre><code>This configuration performs a simple, minimal OS test using
examples/ostest.  This can be configured as follows:

1) From a POSIX window:

     tools/configure.sh [OPTIONS] z80sim:ostest

   where you need to select the right [OPTIONS] for your build
   environment.  Do:

     tools/configure.sh -h

   to see the options.

2) Make sure that your PATH environment variable includes the path
   to the SDCC toolchain.

3) Then build the binaries:

      make

NOTES:

1. This configuration uses the mconf-based configuration tool.  See the
   &quot;Reconfiguring&quot; section below for information about changing this
   configuration.

2. The default setup for this configuration builds under Linux.
   See the section entitled &quot;Reconfiguring for Windows Native, Cygwin,
   or macOS&quot; which will give you the steps you would need to do to convert
   this configuration to build in other environments.

3. This configuration was last verified successfully prior to the
   the configure to Kconfig/mconf tool using SDCC 2.6.0 built to run
   natively under Cygwin.  The current build requires ca. 3.2.1 SDCC.
</code></pre><p>nsh</p><pre><code>This configuration file builds NSH (examples/nsh).  This
configuration is not functional due to issues with use of the
simulated serial driver (see the TODO list).

This configuration can be selected by:

1) From a POSIX window:

     tools/configure.sh [OPTIONS] z80sim:nsh

   where you need to select the right [OPTIONS] for your build
   environment.  Do:

     tools/configure.sh -h

   to see the options.

2) Set the PATH environment variable to include the path to the SDCC
   toolchain.

3) Then build the binaries:

      make

NOTES:

1. This configuration uses the mconf-based configuration tool.  See the
   &quot;Reconfiguring&quot; section below for information about changing this
   configuration.

2. The default setup for this configuration uses a windows native build.
   See the section entitled &quot;Reconfiguring for Windows Native, Cygwin,
   or macOS&quot; which will give you the steps you would need to do to convert
   this configuration to build in other environments.

3. This configuration was last verified successfully prior to the
   the configure to Kconfig/mconf tool using SDCC 2.6.0 built to run
   natively under Cygwin.nsh/defconfig:CONFIG_BOARD_LOOPSPERMSEC
</code></pre><p>Reconfiguring NuttX ^^^^^^^^^^^^^^^^^^^</p><p>These configurations all use the kconfig-frontends, mconf-based configuration tool. To change this configuration using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt and additional README.txt files in the NuttX tools repository.</p><p>b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p><p>Reconfiguring for Windows Native, Cygwin, or macOS ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</p><p>All of the z80 configurations in this directory are set up to build under Linux. That configuration can be converted to run natively in a Windows CMD.exe shell. That configuration requires the MinGW host compiler and several GNUWin32 tools (see discussion in the top-level NuttX/README.txt file) and the following changes to the configuration file:</p><p>-CONFIG_HOST_LINUX=y +CONFIG_HOST_WINDOWS=y +CONFIG_WINDOWS_NATIVE=y</p><p>You may need to first manually change the CONFIG_APPS_DIR=&quot;../apps&quot; definition in the .config file because the forward slash may upset some Windows-based tools.</p><p>This configuration will require a recent version of SDCC (ca. 3.2.1) for Linux or custom built for Cygwin (see below).</p><p>SDCC ^^^^</p><p>IMPORTANT NOTE as of 2020-4-11: Support for CONFIG_CAN_PASS_STRUCTS was removed in NuttX-9.1. This was necessary to enforce some POSIX interface compliance but also means that ALL older SDCC versions will no long build with NuttX. I have been told that the newest SDCC compilers can indeed pass structure and union parameters and return values. If that is correct, then perhaps the newer SDCC compilers will be used. Otherwise, it will be necessary to use some other, more compliant compiler.</p><p>These z80 configurations all use the SDCC toolchain (<a href="http://sdcc.sourceforge.net/" target="_blank" rel="noreferrer">http://sdcc.sourceforge.net/</a>). Source and pre-built SDCC binaries can be downloaded from the SDCC SourceForge site: <a href="http://sourceforge.net/projects/sdcc/files/" target="_blank" rel="noreferrer">http://sourceforge.net/projects/sdcc/files/</a> . Pre-built binaries are available for Linux, macOS, and for Win32. Various SDCC options can be selected with:</p><p>CONFIG_Z80_TOOLCHAIN_SDCC=y : SDCC for Win32, Linux, macOS or Cygwin</p><p>SDCC versions 3.2.0 or higher are recommended.</p><p>Building the SDCC toolchain ^^^^^^^^^^^^^^^^^^^^^^^^^^^</p><p>You may also want to build your own SDCC toolchain. You might want to do this, for example, if you are running under Cygwin and want a Cygwin compatible SDCC toolchain.</p><p>The SDCC toolchain is built with the standard configure/make/make install sequence. However, some special actions are required to generate libraries compatible with this build. First start with the usual steps</p><p>download unpack cd sdcc ./configure</p><p>Note if you do not have the gputils packet installed, newer version of the SDCC configure will fail. You will have to either install the gputils package or if you don&#39;t need PIC14 or PIC16 support:</p><p>./configure --disable-pic14-port --disable-pic16-port</p><p>Then make the SDCC binaries</p><p>make</p><p>and install SDCC:</p><p>sudo make install</p>`,34)]))}const d=n(r,[["render",s]]);export{f as __pageData,d as default};
