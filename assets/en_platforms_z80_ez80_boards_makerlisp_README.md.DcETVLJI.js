import{_ as t,c as n,al as o,o as a}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"README.txt","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/z80/ez80/boards/makerlisp/README.md","filePath":"en/platforms/z80/ez80/boards/makerlisp/README.md"}'),i={name:"en/platforms/z80/ez80/boards/makerlisp/README.md"};function r(s,e,l,d,h,c){return a(),n("div",null,e[0]||(e[0]=[o(`<h1 id="readme-txt" tabindex="-1">README.txt <a class="header-anchor" href="#readme-txt" aria-label="Permalink to &quot;README.txt&quot;">​</a></h1><p>The MakerLisp machine is a portable, modular computer system, designed to recapture the feel of classic computing, with modern hardware.</p><p>The machine centers on a 2&quot; x 3.5&quot; business card-sized CPU, which can be used stand-alone, or plugged in to a 2&quot; x 8&quot; main board, for expansion into a full computer system. A laser-cut wood enclosure holds a small keyboard, an LCD monitor, the circuit boards, and a prototyping area with a breadboard for electronics experimentation and development.</p><p>The CPU is a Zilog eZ80 running at 50 MHz, with up to 16 Mb of zero-wait state RAM. A VGA display adapter provides an IBM PC-like color text-mode display. A USB Host Controller supports a USB keyboard and other USB communications. Data storage and interchange is accomplished by a micro-SD card supporting the FAT file system. All four of these circuit boards (shown on the web site&#39;s cover page) are new MakerLisp products, and will be available as part of the first product offering</p><h1 id="contents" tabindex="-1">Contents <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;Contents&quot;">​</a></h1><p>o ZDS-II Compiler Versions o Serial Console - UARTs - Serial Keyboard and VGA Display o LEDs and Buttons - LEDs - Buttons o Configurations - Common Configuration Notes - Configuration Subdirectories</p><h1 id="zds-ii-compiler-versions" tabindex="-1">ZDS-II Compiler Versions <a class="header-anchor" href="#zds-ii-compiler-versions" aria-label="Permalink to &quot;ZDS-II Compiler Versions&quot;">​</a></h1><p>Version 5.3.3</p><p>As of this writing, this is the latest version available. This is the default configured for all ez80 boards.</p><p>Version 5.3.0</p><p>I verified compilation using 5.3.0 on June 2, 2019. To use this version, I had to make spurious modification to the implementation of gmtimer() to work around an internal compiler error. I have still not verified that are no errors in the compiled code.</p><p>Other Versions If you use any version of ZDS-II other than 5.3.0 or if you install ZDS-II at any location other than the default location, you will have to modify three files: (1) arch/arm/z80/src/ez80/Kconfig, (2) boards/z80/ez80/makerlisp/scripts/Make.defs and, perhaps, (3) arch/z80/src/ez80/Toolchain.defs.</p><h1 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h1><p>There are two options for a serial console: (1) A UART connected to a terminal program or (2) the MakerLisp Serial Keyboard and VGA display.</p><h2 id="uarts" tabindex="-1">UARTs <a class="header-anchor" href="#uarts" aria-label="Permalink to &quot;UARTs&quot;">​</a></h2><p>The eZ80 has two UART peripherals:</p><p>UART 0: All of Port D pins can support UART0 functions when configured for the alternate function 7. For typical configurations only RXD and TXD need be configured.</p><pre><code>eZ80 PIN        BOARD SIGNAL CN1 ACCESS
=======================================
PD0/TXD0/IR_IXD CN1_TX0      Pin 61
PD1/RXD0/IR_RXD CN1_RX0      Pin 59
PD2/RTS0        CN1_RTS0     Pin 63
PD3/CTS0        CN1_CTS0     Pin 65
PD4/DTR0        CN1_DTR0     Pin 67
PD5/DSR0        CN1_DSR0     Pin 69
PD6/DCD0        CN1_DCD0     Pin 71
PD7/RIO0        CN1_RI0      Pin 73
</code></pre><p>UART0 (as well as I2C) is also available via a USB using the on-board MCP2221A USB adapter. CN1_USBUART_TX_EN and CN1_USBUART_RX_EN are pulled low poll on the CPU board in order to connect CN1_RX0 and CN1_TX0 to MCP_RX and MCP_TX.</p><p>When the I/O expander board is connected, jumpers J1 and J2 control this functionality. These can pull the CN1_USBUART_TX_EN and CN1_USBUART_RX_EN pins high and so that UART0 can be used for other purposes.</p><p>UART 1: All of Port C pins can support UART1 functions when configured for the alternate function 7. For typical configurations only RXD and TXD need be configured.</p><pre><code>eZ80 PIN        BOARD SIGNAL CN1 ACCESS
=======================================
PC0/TXD1        CN1_TX1      Pin 62
PC1/RXD1        CN1_RX1      Pin 60
PC2/RTS1        CN1_RTS1     Pin 64
PC3/CTS1        CN1_CTS1     Pin 66
PC4/DTR1        CN1_DTR1     Pin 68
PC5/DSR1        CN1_DSR1     Pin 70
PC6/DCD1        CN1_DCD1     Pin 72
PC7/RIO1        CN1_RI1      Pin 74
</code></pre><p>With the I/O exanpander board (and J1 and J2 open), these UARTs can be used with a host terminal emulation, by connecting either a TTL-to-RS232 or a TTL-to-USB Serial adapter to CN1 pins 59 and 61, and 60 and 62, depending on the selected UART.</p><h2 id="serial-keyboard-and-vga-display" tabindex="-1">Serial Keyboard and VGA Display <a class="header-anchor" href="#serial-keyboard-and-vga-display" aria-label="Permalink to &quot;Serial Keyboard and VGA Display&quot;">​</a></h2><p>The serial console can also be implemented using the MakerLisp USB Keyboard Controller Board and VGA Display Controller. These are accessed via the one UART port, UART0.</p><p>In the default MakerLisp configuration. These boards are connected as follows:</p><ol><li><p>VGA display controller connections (UART0 TX)</p><p>Board interface header 5 -- 5V regulated power input RX -- VGA Display Controller serial input C -- VGA Display Controller ready output TX -- VGA Display Controller serial output G -- GND</p><p>Connections:</p><p>a. 5V &#39;5&#39; pin on VGA board to expansion board power distribution 5V. b. Ground &#39;G&#39; pin on VGA board to expansion board power distribution ground. c. Receive &#39;RX&#39; pin on VGA board to expansion board GPIO PD0 (TXD0). d. Communication, terminal ready indicator &#39;C&#39; pin on VGA board to expansion board GPIO PB1. e. Transmit &#39;TX&#39; pin on VGA board to USB keyboard controller &#39;R&#39;</p><p>To use the VGA display controller with stdout and stderr, you also need to selection CONFIG_MAKERLISP_VGA=y in your configuration. This enables a required VGA initialization sequence.</p></li><li><p>USB keyboard controller (UART0 RX)</p><p>Board interface header</p><p>5 -- 5V regulated power input R -- USB Keyboard Controller serial input T -- USB Keyboard Controller serial output G -- GND</p><p>Connections:</p><p>a. 5V &#39;5&#39; pin on USB board to (other) expansion board power distribution 5V. b. Ground &#39;G&#39; pin on USB board to (other) expansion board power distribution ground. c. Receive &#39;R&#39; pin on USB board to VGA board &#39;TX&#39; (see above). d. Transmit &#39;T&#39; pin on USB board to expansion board GPIO PD1 (RXD0).</p><p>If your keyboard does not seem to be doing anything, check the &#39;RX&#39; jumper on the expansion board. For input from a USB keyboard, and NOT the USB/UART connection, you want this jumper REMOVED, not bridging the two header pins front to back.</p></li></ol><p>The PC terminal software should be configured as described in the MakerLisp Putty HOWTO document: 115200N1 BAUD.</p><h2 id="default-serial-console" tabindex="-1">Default Serial Console <a class="header-anchor" href="#default-serial-console" aria-label="Permalink to &quot;Default Serial Console&quot;">​</a></h2><p>UART0 is the default serial console in all configurations unless otherwise noted in the description of the configuration.</p><h1 id="leds-and-buttons" tabindex="-1">LEDs and Buttons <a class="header-anchor" href="#leds-and-buttons" aria-label="Permalink to &quot;LEDs and Buttons&quot;">​</a></h1><h2 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h2><p>Three LEDs are available on the CPU Card, but none are available for general use by applications:</p><p>D2 RED: CPU Card power. Not under eZ80 control D3 GREEN: Driven by CPU GPI/O pin. However, it has some additional properties:</p><pre><code>         1. On input, it will be &#39;1&#39; if the I/O expansion board is
            present.
         2. Setting it to an output of &#39;0&#39; will generate a system reset.
         3. Setting it to an output of &#39;1&#39; will not only illuminate the
            LED take the card out of reset and enable power to the SD
            card slot.

         As a consequence, the GREEN LED will not be illuminated if
         SD card support or SPI is disabled.  The only effect of
         CONFIG_ARCH_LEDS is that the GREEN LED will turned off in
         the event of a crash.
</code></pre><p>D1 AMBER: Controlled by the on-board MCP2221A USB bridge and provides USB enumeration status. Not under eZ80 control.</p><h2 id="buttons" tabindex="-1">Buttons <a class="header-anchor" href="#buttons" aria-label="Permalink to &quot;Buttons&quot;">​</a></h2><p>The MakerLisp CPU board has no on-board buttons that can be sensed by the eZ80.</p><h1 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h1><h2 id="common-configuration-notes" tabindex="-1">Common Configuration Notes <a class="header-anchor" href="#common-configuration-notes" aria-label="Permalink to &quot;Common Configuration Notes&quot;">​</a></h2><ol><li><p>src/ and include/</p><p>These directories contain common logic for all MakerLisp configurations.</p></li><li><p>Variations on the basic MakerLisp configuration are maintained in subdirectories. To configure any specific configuration, do the following steps:</p><p>tools/configure.sh [OPTIONS] makerlisp:<code>&lt;sub-directory&gt;</code> make</p><p>Where <code>&lt;sub-directory&gt;</code> is the specific board configuration that you wish to build. Use &#39;tools/configure.sh -h&#39; to see the possible options. Typical options are:</p><p>-l Configure for a Linux host -c Configure for a Windows Cygwin host -g Configure for a Windows MYS2 host</p><p>Use configure.bat instead of configure.sh if you are building in a native Windows environment.</p><p>The available board-specific configurations are summarized in the following paragraphs.</p><p>When the build completes successfully, you will find this files in the top level nuttx directory:</p><p>a. nuttx.hex - A loadable file in Intel HEX format b. nuttx.lod - A loadable file in ZDS-II binary format c. nuttx.map - A linker map file</p></li><li><p>ZDS-II make be used to write the nuttx.lod file to FLASH. General instructions:</p><p>a. Start ZDS-II b. Open the project, for example, nsh/nsh.zdsproj c. Select Debug-&gt;Connect To Target d. Select Debug-&gt;Download code</p><p>There are projects for the ZiLOG Smart Flash Programmer as well but these are not functional as of this writing.</p></li><li><p>This configuration uses the mconf-based configuration tool. To change this configurations using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository.</p><p>b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></li></ol><h2 id="configuration-subdirectories" tabindex="-1">Configuration Subdirectories <a class="header-anchor" href="#configuration-subdirectories" aria-label="Permalink to &quot;Configuration Subdirectories&quot;">​</a></h2><p>nsh_flash, nsh_ram:</p><pre><code>These configuration build the NuttShell (NSH).  That code can be
found in apps/system/nsh and apps/system/nshlib..  For more
information see:  apps/system/nsh/README.txt and
Documentation/NuttShell.html.

NOTES:

1. The two configurations different only in that one builds for
   execution entirely from FLASH and the other for execution entirely
   from RAM.  A bootloader of some kind is required to support such
   execution from RAM!  This difference is reflected in a single
   configuration setting:

     CONFIG_BOOT_RUNFROMFLASH=y    # Execute from flash (default)
     CONFIG_BOOT_RUNFROMEXTSRAM=y  # Execute from external SRAM

   A third configuration is possible but not formalized with its own
   defconfig file:  You can also configure the code to boot from FLASH,
   copy the code to external SRAM, and then execute from RAM.  Such a
   configuration needs the following settings in the .config file:

     CONFIG_BOOT_RUNFROMEXTSRAM=y  # Execute from external SRAM
     CONFIG_MAKERLISP_COPYTORAM=y  # Boot from FLASH but copy to SRAM

   Why execute from SRAM at all?  Because you will get MUCH better
   performance because of the zero wait state SRAM implementation.

2. A serial console is provided on UART0.  This configuration should work
   with or without the the VGA and Keyboard adapter boards.  Normal
   connectivity is via host serial console connected through the USB
   serial console.

   With the I/O expansion board, the serial console can also be used with
   either a TTL-to-RS232 or a TTL-to-USB Serial adapter connected by CN1
   pins 59 and 61.

   The default baud setting is 115200N1.

   To use the VGA display controller with stdin, stdout and stderr, you
   also need to selection CONFIG_MAKERLISP_VGA=y in your configuration.
   This enables a required VGA initialization sequence.

   The PC terminal software should be configured as described in the
   MakerLisp Putty HOWTO document:  115200N1 BAUD.

3. The eZ80 RTC, the procFS file system, and SD card support in included.
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

4. Debugging the RAM version

   You can debug the all RAM version using ZDS-II as follows:

   a. Connect to the debugger,
   b. Reset, Go, and Break.  This will initialize the external RAM
   c. Break and Load the nuttx.lod file
   c. Set the PC to 0x040000
   d. Single step a few times to make sure things look good, then
   e. Go

5. Optimizations:

   - The stack sizes have not been tuned and, hence, are probably too
     large.

STATUS:
  2019-06-16:  The basic NSH configuration appears to be fully functional
    using only the CPU and I/O expansion card.  Console is provided over
    USB.

    Added support for SPI-based SD cards, the RTC and procFS.  There are
    still a few issues at the end-of-the-day:  (1) the SD card initialization
    hangs and prevents booting, and (2) RTC does not preserve time across a
    power cycle.

  2019-06-17:  The SD initialization was due to some error in the SPI driver:
    It waits for a byte transfer to complete but it never receives the
    indication that the transfer completed.  That SPI problem has been
    fixed and now the SD card is functional.

  2019-06-18:  The RTC now appears to be fully functional.

  2019-06-26:  Renamed nsh configuration to nsh_flash.  Added nsh_ram
    configuration.  Not yet verified.

  2019-07-09:  The RAM version does not run!  I can single step through
    the initialization and all looks well, but when I &quot;Go&quot;, the system
    crashes.  The PC is sitting at a crazy address when I break in.  I
    have not yet debugged this.

    The identical FLASH version, differing only in the selected linker
    script, works just fine.  This implies some issue with the
    configuration of SRAM for execution.
</code></pre><p>sdboot</p><pre><code>This configuration implements a very simple boot loader.  In runs from
FLASH and simply initializes the external SRAM, mounts the FAT file
system on the SD card, and checks to see if there is a file called
nuttx.hex on the SD card.  If so, it will load the Intel HEX file into
memory and jump to address 0x040000.  This, of course, assumes that
the application&#39;s reset vector resides at address 0x040000 in external
SRAM.

The boot loader source is located at boards/makerlisp/src/sd_main.c.

STATUS:
  2019-06-26:  Configuration added.  Not yet verified.
</code></pre><p>nsh_flash/README.txt ^^^^^^^^^^^^^^^^^^^^</p><p>nsh.zdsproj is a simple ZDS-II project that will allow you to use the ZDS-II debugger. nsh.zfpproj is a simple project that will allow you to use the Smart Flash Programming. NOTE: As of this writing this project does not work, probably due to RAM configuration in the project. Use ZDS-II instead as is described in the upper README.txt file nsh_flash.ztgt is the target file that accompanies the project files. This one is identical to boards/scripts/makerlisp_ram.ztgt. nsh_ram.ztgt is the target file that accompanies the project files. This one is identical to boards/scripts/makerlisp_flash.ztgt.</p><p>sdboot/README.txt ^^^^^^^^^^^^^^^^^</p><p>sdboot.zdsproj is a simple ZDS-II project that will allow you to use the ZDS-II debugger. sdboot.zfpproj is a simple project that will allow you to use the Smart Flash Programming. NOTE: As of this writing this project does not work, probably due to RAM configuration in the project. Use ZDS-II instead as is described in the upper README.txt file sdboot_flash.ztgt is the target file that accompanies the project files. This one is identical to boards/scripts/makerlisp_ram.ztgt. sdboot_ram.ztgt is the target file that accompanies the project files. This one is identical to boards/scripts/makerlisp_flash.ztgt.</p><p>nsh_ram/README.txt ^^^^^^^^^^^^^^^^^^</p><p>nsh.zdsproj is a simple ZDS-II project that will allow you to use the ZDS-II debugger. nsh.zfpproj is a simple project that will allow you to use the Smart Flash Programming. NOTE: As of this writing this project does not work, probably due to RAM configuration in the project. Use ZDS-II instead as is described in the upper README.txt file nsh_flash.ztgt is the target file that accompanies the project files. This one is identical to boards/scripts/makerlisp_ram.ztgt. nsh_ram.ztgt is the target file that accompanies the project files. This one is identical to boards/scripts/makerlisp_flash.ztgt.</p>`,52)]))}const f=t(i,[["render",r]]);export{u as __pageData,f as default};
