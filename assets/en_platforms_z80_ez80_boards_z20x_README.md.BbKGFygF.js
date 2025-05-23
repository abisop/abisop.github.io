import{_ as n,c as t,al as o,o as a}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"README.txt","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/z80/ez80/boards/z20x/README.md","filePath":"en/platforms/z80/ez80/boards/z20x/README.md"}'),i={name:"en/platforms/z80/ez80/boards/z20x/README.md"};function s(r,e,l,d,h,u){return a(),t("div",null,e[0]||(e[0]=[o(`<h1 id="readme-txt" tabindex="-1">README.txt <a class="header-anchor" href="#readme-txt" aria-label="Permalink to &quot;README.txt&quot;">​</a></h1><p>Z20X is a simple expandable DIY computing system, built around the eZ80 microprocessor. The eZ80 was chosen due to its native simplicity and full backward code compatibility with the great and very popular Z80 and Z180. The design goal of Z20X is to offer a good DIY/LIY (Do-It-Yourself/Learn- It-Yourself) kit for system built with through-hole components, simple enough for assembly and learning in deep details, but without the constraints of using only old technology ICs. In order to maintain full exposure to technical details, the system also avoids using secondary MCUs or programmable logic, and sticks only with true hardware solutions.</p><p>System Summary</p><pre><code>eZ80 running at 20 MHz (default on board)
128 KB flash ROM (internal for eZ80)
520 KB total RAM on board (512K external plus 8K internal)
4 MB non-volatile storage (optional, can be upgraded by changing the IC)
Real-time clock
SSD1963-powered 7.0 inch TFT display with resolution 800 x 480 pixels
  and touch panel
SD card slot
YM2413 programmable sound generator with amplifier
PS/2 connectors for industry standard keyboard and mouse
Additionally installable processor modules
72-pin expansion header with Z20X bus
Optional expander board with Z20X bus sockets and bonus support for
  RC2014 bus
</code></pre><h1 id="contents" tabindex="-1">Contents <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;Contents&quot;">​</a></h1><p>o ZDS-II Compiler Versions o Environments o Memory Constraints o Serial Console o LEDs and Buttons - LEDs - Buttons o Configurations - Common Configuration Notes - Configuration Subdirectories</p><h1 id="zds-ii-compiler-versions" tabindex="-1">ZDS-II Compiler Versions <a class="header-anchor" href="#zds-ii-compiler-versions" aria-label="Permalink to &quot;ZDS-II Compiler Versions&quot;">​</a></h1><p>Version 5.3.3</p><p>As of this writing, this is the latest version available. This is the default configured for all ez80 boards.</p><p>Compilation using version 5.3.3 was verified on February 20, 2020.</p><p>Version 5.3.0</p><p>Compilation using version 5.3.0 was verified on February 19, 2020.</p><p>Other Versions If you use any version of ZDS-II other than 5.3.0/3 or if you install ZDS-II at any location other than the default location, you will have to modify three files: (1) arch/arm/z80/src/ez80/Kconfig, (2) boards/z80/ez80/z20x/scripts/Make.defs and, perhaps, (3) arch/z80/src/ez80/Toolchain.defs.</p><h1 id="environments" tabindex="-1">Environments <a class="header-anchor" href="#environments" aria-label="Permalink to &quot;Environments&quot;">​</a></h1><p>Cygwin:</p><p>All testing was done using the Cygwin environment under Windows.</p><p>MinGW/MSYS</p><p>One attempt was made using the MSYS2 environment under Windws. That build correctly until the very end, then it failed to include &quot;chip.h&quot;. this was traced to arch/z80/src/Makefile.zdsiil: The usrinc paths created by Makefile.zdsiil contained POSIX-style paths that were not usable to the ZDS-II compiler.</p><p>Native</p><p>The Windows native build has not been attempt. I would expect that it would have numerous problems.</p><h1 id="memory-constraints" tabindex="-1">Memory Constraints <a class="header-anchor" href="#memory-constraints" aria-label="Permalink to &quot;Memory Constraints&quot;">​</a></h1><p>The eZ80F92 has a smaller FLASH memory of 128Kb. That combined with the fact that the size of NuttX is increasing means that it is very easy to exceed the ROM address space.</p><p>The sdboot configuration will fit into the ROM address space, but NOT if you enable assertions, debug outputs, or even debug symbols.</p><h1 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h1><p>The eZ80 has two UART peripherals:</p><p>UART 0: All of Port D pins can support UART0 functions when configured for the alternate function 7. For typical configurations only RXD and TXD need be configured.</p><pre><code>eZ80 PIN
===============
PD0/TXD0/IR_IXD
PD1/RXD0/IR_RXD
PD2/RTS0
PD3/CTS0
PD4/DTR0
PD5/DSR0
PD6/DCD0
PD7/RIO0
</code></pre><p>PD0 and PD1 connect to the PS/2 keyboard connector.</p><p>UART 1: All of Port C pins can support UART1 functions when configured for the alternate function 7. For typical configurations only RXD and TXD need be configured.</p><pre><code>eZ80 PIN
========
PC0/TXD1
PC1/RXD1
PC2/RTS1
PC3/CTS1
PC4/DTR1
PC5/DSR1
PC6/DCD1
PC7/RIO1
</code></pre><p>PC0 and PC1 connect both to the MCP2221 UART-to-USB converter and also to the PS/2 mouse connector.</p><p>UART1 is the default serial console in all configurations unless otherwise noted in the description of the configuration.</p><h1 id="leds-and-buttons" tabindex="-1">LEDs and Buttons <a class="header-anchor" href="#leds-and-buttons" aria-label="Permalink to &quot;LEDs and Buttons&quot;">​</a></h1><p>There are no on-board user LEDs or buttons.</p><h1 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h1><h2 id="common-configuration-notes" tabindex="-1">Common Configuration Notes <a class="header-anchor" href="#common-configuration-notes" aria-label="Permalink to &quot;Common Configuration Notes&quot;">​</a></h2><ol><li><p>src/ and include/</p><p>These directories contain common logic for all z20x configurations.</p></li><li><p>Variations on the basic z20x configuration are maintained in subdirectories. To configure any specific configuration, do the following steps:</p><p>tools/configure.sh [OPTIONS] z20x:<code>&lt;sub-directory&gt;</code> make</p><p>Where <code>&lt;sub-directory&gt;</code> is the specific board configuration that you wish to build. Use &#39;tools/configure.sh -h&#39; to see the possible options. Typical options are:</p><p>-l Configure for a Linux host -c Configure for a Windows Cygwin host -g Configure for a Windows MYS2 host</p><p>Use configure.bat instead of configure.sh if you are building in a native Windows environment.</p><p>The available board-specific configurations are summarized in the following paragraphs.</p><p>When the build completes successfully, you will find this files in the top level nuttx directory:</p><p>a. nuttx.hex - A loadable file in Intel HEX format b. nuttx.lod - A loadable file in ZDS-II binary format c. nuttx.map - A linker map file</p></li><li><p>ZDS-II make be used to write the nuttx.lod file to FLASH. General instructions:</p><p>a. Start ZDS-II b. Open the project, for example, nsh/nsh.zdsproj c. Select Debug-&gt;Connect To Target d. Select Debug-&gt;Download code</p><p>There are projects for the ZiLOG Smart Flash Programmer as well but these are not functional as of this writing.</p></li><li><p>This configuration uses the mconf-based configuration tool. To change this configurations using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository.</p><p>b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></li></ol><h2 id="configuration-subdirectories" tabindex="-1">Configuration Subdirectories <a class="header-anchor" href="#configuration-subdirectories" aria-label="Permalink to &quot;Configuration Subdirectories&quot;">​</a></h2><p>hello:</p><pre><code>This is a minimal &quot;Hello, World!&quot; program that runs out of RAM.  It is
a small program that is really useful only for testing the bootloader.

NOTES:

1. Debugging from RAM

   You can debug from RAM version using ZDS-II as follows:

   a. Connect to the debugger,
   b. Reset, Go, and Break.  This will initialize the external RAM
   c. Break and Load the nuttx.lod file
   c. Set the PC to 0x050000
   d. Single step a few times to make sure things look good, then
   e. Go
</code></pre><p>nsh:</p><pre><code>This configuration builds the NuttShell (NSH).  That code can be
found in apps/system/nsh and apps/system/nshlib..  For more
information see:  apps/system/nsh/README.txt and
Documentation/NuttShell.html.

To be usable, this configuration should:  (1) Use the same BAUD
as the bootloader and (2) switch from the MMC/SD card to the second
partition in the W25 part.

NOTES:

1. This configuration builds for execution entirely from RAM.  A
   bootloader of some kind is required to support such execution from
   RAM!  This is reflected in a single configuration setting:

     CONFIG_BOOT_RUNFROMEXTSRAM=y  # Execute from external SRAM

   Why execute from SRAM?  Because you will get MUCH better performance
   because of the zero wait state SRAM implementation and you will not
   be constrained by the eZ80F92&#39;s small FLASH size.

2. The eZ80 RTC, the procFS file system, and SD card support in included.
   The procFS file system will be auto-mounted at /proc when the board
   boots.

   The RTC can be read and set from the NSH date command.

     nsh&gt; date
     Thu, Dec 19 20:53:29 2086
     nsh&gt; help date
     date usage:  date [-s &quot;MMM DD HH:MM:SS YYYY&quot;]
     nsh&gt; date -s &quot;Jun 16 15:09:00 2019&quot;
     nsh&gt; date
     Sun, Jun 16 15:09:01 2019

   When the system boots, it will probe the SD card and create a
   block driver called mmcsd0:

     nsh&gt; ls /dev
     /dev:
      console
      mmcsd0
      null
      ttyS0
     nsh&gt; mount
       /proc type procfs

   The SD card can be mounted with the following NSH mount command:

     nsh&gt; mount -t vfat /dev/mmcsd0 /mnt/sdcard
     nsh&gt; ls /mnt
     /mnt:
      sdcard/
     nsh&gt; mount
       /mnt/sdcard type vfat
       /proc type procfs
     nsh&gt; ls -lR /mnt/sdcard
     /mnt/sdcard:
      drw-rw-rw-       0 System Volume Information/
     /mnt/sdcard/System Volume Information:
      -rw-rw-rw-      76 IndexerVolumeGuid
      -rw-rw-rw-      12 WPSettings.dat

   You can they use the SD card as any other file system.

     nsh&gt; ls /mnt/sdcard
     /mnt/sdcard:
      System Volume Information/
     nsh&gt; echo &quot;This is a test&quot; &gt;/mnt/sdcard/atest.txt
     nsh&gt; ls /mnt/sdcard
     /mnt/sdcard:
      System Volume Information/
      atest.txt
     nsh&gt; cat /mnt/sdcard/atest.txt
     This is a test

   Don&#39;t forget to un-mount the volume before power cycling:

     nsh&gt; mount
       /mnt/sdcard type vfat
       /proc type procfs
     nsh&gt; umount /mnt/sdcard
     nsh&gt; mount
       /proc type procfs

   NOTE:  The is no card detect signal so the microSD card must be
   placed in the card slot before the system is started.

3. Debugging from RAM

   You can debug from RAM version using ZDS-II as follows:

   a. Connect to the debugger,
   b. Reset, Go, and Break.  This will initialize the external RAM
   c. Break and Load the nuttx.lod file
   c. Set the PC to 0x050000
   d. Single step a few times to make sure things look good, then
   e. Go

4. Optimizations:

   - The stack sizes have not been tuned and, hence, are probably too
     large.
</code></pre><p>w25boot</p><pre><code>This configuration implements a very simple boot loader.  In runs from
FLASH and simply initializes the external SRAM, mounts the W25 FLASH
and checks to see if there is a valid binary image at the beginning of
FLASH.  If so, it will load the binary into RAM, verify it and jump to
0x50000.  This, of course, assumes that the application&#39;s entry point
vector resides at address 0x050000 in external SRAM.

The boot loader source is located at boards/z20x/src/w25_main.c.

When starting, you may see one of two things, depending upon whether or
not there is a valid, bootable image in the W25 FLASH partition:

1. If there is a bootable image in FLASH, you should see something like:

    Verifying 203125 bytes in the W25 Serial FLASH
    Successfully verified 203125 bytes in the W25 Serial FLASH
    [L]oad [B]oot
    .........

   The program will wait up to 5 seconds for you to provide a response:
   B to load the program program from the W25 and start it, or L to
   download a new program from serial and write it to FLASH.

   If nothing is pressed in within the 5 second delay, the program will
   continue to boot the program just as though B were pressed.

   If L is pressed, then you should see the same dialog as for the case
   where there is no valid binary image in FLASH.

2. If there is no valid program in FLASH (or if L is pressed), you will
   be asked to :

     Send HEX file now.

NOTES:

1. A large UART1 Rx buffer (4Kb), a slow UART1 BAUD (2400), and a very
   low Rx FIFO trigger are used to avoid serial data overruns.  Running
   at only 20MHz, the eZ80F92 is unable to process 115200 BAUD Intel Hex
   at speed.  It is likely that a usable BAUD higher than 2400 could be
   found through experimentation; it could also be possible to implement
   some software handshake to protect the eZ80f92 from overrun (the
   eZ80F92 does not support hardware flow control)

   At 2400 BAUD the download takes a considerable amount of time but
   seems to be reliable

   Massive data loss occurs due to overruns at 115200 BAUD.  I have
   tried the bootloader at 9600 with maybe 30-40% data loss, too much
   data loss to be usable.  At 9600 baud, the Rx data overrun appears
   to be in the Rx FIFO; the data loss symptom is small sequences of
   around 8-10 bytes often missing in the data.  Apparently, the Rx FIFO
   overflows before the poor little  eZ80F92 can service the Rx
   interrupt and clear the FIFO.

   The Rx FIFO trigger is set at 1 so that the ez80F92 will respond as
   quickly to receipt of Rx data is possible and clear out the Rx FIFO.
   The Rx FIFO trigger level is a trade-off be fast responsiveness and
   reduced chance of Rx FIFO overrun (low) versus reduced Rx interrupt
   overhead (high).

   Things worth trying:  4800 BAUD, smaller Rx buffer, large Rx FIFO
   trigger level.

2. Booting large programs from the serial FLASH is unbearably slow;
   you will think that the system is simply not booting at all.  There
   is probably some bug contributing to this probably (maybe the timer
   interrupt rate?)
</code></pre>`,44)]))}const m=n(i,[["render",s]]);export{p as __pageData,m as default};
