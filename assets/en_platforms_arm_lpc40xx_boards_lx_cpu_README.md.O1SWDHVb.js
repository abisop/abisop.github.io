import{_ as n,c as t,al as o,o as a}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"README.txt","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/lpc40xx/boards/lx_cpu/README.md","filePath":"en/platforms/arm/lpc40xx/boards/lx_cpu/README.md"}'),i={name:"en/platforms/arm/lpc40xx/boards/lx_cpu/README.md"};function s(r,e,l,h,u,d){return a(),t("div",null,e[0]||(e[0]=[o(`<h1 id="readme-txt" tabindex="-1">README.txt <a class="header-anchor" href="#readme-txt" aria-label="Permalink to &quot;README.txt&quot;">​</a></h1><p>This README file discusses the port of NuttX to the PiKRON LX_CPU board: See <a href="http://pikron.com/pages/products/cpu%5C_boards/lx%5C_cpu.html" target="_blank" rel="noreferrer">http://pikron.com/pages/products/cpu\\_boards/lx\\_cpu.html</a>. This board features the NXP LPC4088 MCU</p><h1 id="contents" tabindex="-1">CONTENTS <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;CONTENTS&quot;">​</a></h1><p>o LEDs o Serial Console o ETHERNET o Using OpenOCD with the Olimex ARM-USB-OCD o Loading Code with the ISP Board o Configuration</p><h1 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h1><p>The LX_CPU base board has two user LEDs</p><pre><code>LED1 : Connected to P1[29]  RED
LED2 : Connected to P0[16]  GREEN
</code></pre><p>If CONFIG_ARCH_LEDS is not defined, then the user can control the LEDs in any way using the definitions provided in the board.h header file.</p><p>If CONFIG_ARCH_LEDs is defined, then NuttX will control the 2 LEDs on the WaveShare Open1788K. The following definitions describe how NuttX controls the LEDs: LED1 LED2 LED_STARTED OFF OFF LED_HEAPALLOCATE ON OFF LED_IRQSENABLED OFF ON LED_STACKCREATED ON ON LED_INIRQ LED_SIGNAL LED_ASSERTION LED_PANIC LED_IDLE</p><h1 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h1><p>By Default, UART0 is used as the serial console in all configurations. This may be connected to your computer via an external RS-232 driver or via the WaveShare USB ISP/VCOM module.</p><p>As an option, UART1 can also be used for the serial console. You might want, to do this, for example, if you use UART0 for the ISP function and you want to use a different UART for console output. UART1 can be configured as the serial console by changing the configuration as follows:</p><pre><code>System Type:
  CONFIG_LPC17_UART0=n          : Disable UART0 if it is no longer used
  CONFIG_LPC17_UART1=y          : Enable UART1

Drivers:
  CONFIG_UART1_SERIAL_CONSOLE=y : Setup up the UART1 configuration
  CONFIG_UART1_RXBUFSIZE=256
  CONFIG_UART1_TXBUFSIZE=256
  CONFIG_UART1_BAUD=115200
  CONFIG_UART1_BITS=8
  CONFIG_UART1_PARITY=0
  CONFIG_UART1_2STOP=0
</code></pre><p>In this configuration using UART1, it is necessary to disable LED support on the board. That is because UART1 RXD is set for pin p0.16, but so is LED2. If you do not disable LED support then no incoming serial data will be received.</p><pre><code>Common Board Options
  CONFIG_ARCH_LEDS=n             : Disable LED support
</code></pre><p>You should also remove the LED2 jumper so that the RXD input does not attempt to drive LED2 as well (However, this does not seem to interfere with data receipt).</p><p>NOTE: If you intend to use LEDs with UART1, then you might want to redesign some of the LED logic in the src/ subdirectory so that it does not attempt to use LED2.</p><h1 id="ethernet" tabindex="-1">ETHERNET <a class="header-anchor" href="#ethernet" aria-label="Permalink to &quot;ETHERNET&quot;">​</a></h1><p>On chip ethernet MAC with external 10/100M PHY DP83848I. The LX_CPU board is populated with integrated connector module (ICM) socket suitable for direct connection to the standard ETHERNET infrastructure.</p><p>Config CONFIG_LPC17_ETHERNET=y CONFIG_LPC17_PHY_AUTONEG=y CONFIG_ETH0_PHY_DP83848C=y</p><h1 id="using-openocd-with-the-olimex-arm-usb-ocd" tabindex="-1">Using OpenOCD with the Olimex ARM-USB-OCD <a class="header-anchor" href="#using-openocd-with-the-olimex-arm-usb-ocd" aria-label="Permalink to &quot;Using OpenOCD with the Olimex ARM-USB-OCD&quot;">​</a></h1><p>Building OpenOCD under Cygwin:</p><pre><code>Refer to Documentation/platforms/arm/lpc17xx/boards/olimex-lpc1766stk/README.txt
</code></pre><p>Installing OpenOCD in Ubuntu Linux:</p><pre><code>sudo apt-get install openocd
</code></pre><p>Helper Scripts.</p><pre><code>I have been using the Olimex ARM-USB-OCD debugger.  OpenOCD
requires a configuration file.  I keep the one I used last here:

  boards/arm/lpc17xx_40xx/lx_cpu/tools/lx_cpu.cfg

However, the &quot;correct&quot; configuration script to use with OpenOCD may
change as the features of OpenOCD evolve.  So you should at least
compare that lx_cpu.cfg file with configuration files in
/usr/share/openocd/scripts.  As of this writing, the configuration
files of interest were:

  /usr/local/share/openocd/scripts/interface/openocd-usb.cfg
    This is the configuration file for the Olimex ARM-USB-OCD
    debugger.  Select a different file if you are using some
    other debugger supported by OpenOCD.

  /usr/local/share/openocd/scripts/board/?
    I don&#39;t see a board configuration file for the WaveShare
    LX_CPU board.

  /usr/local/share/openocd/scripts/target/lpc1788.cfg
    This is the configuration file for the LPC1788 target.
    It just sets up a few parameters then sources lpc17xx.cfg

  /usr/local/share/openocd/scripts/target/lpc17xx.cfg
    This is the generic LPC configuration for the LPC17xx
    family.  It is included by lpc1788.cfg.

NOTE:  These files could also be located under /usr/share in some
installations.  They could be most anywhwere if you are using a
windows version of OpenOCD.

  boards/arm/lpc17xx_40xx/lx_cpu/tools/lx_cpu.cfg
    This is simply openocd-usb.cfg, lpc1788.cfg, and lpc17xx.cfg
    concatenated into one file for convenience.  Don&#39;t use it
    unless you have to.

There is also a script on the tools/ directory that I use to start
the OpenOCD daemon on my system called oocd.sh.  That script will
probably require some modifications to work in another environment:

- Possibly the value of OPENOCD_PATH and TARGET_PATH
- It assumes that the correct script to use is the one at
  boards/arm/lpc17xx_40xx/lx_cpu/tools/lx_cpu.cfg
</code></pre><p>Starting OpenOCD</p><pre><code>Then you should be able to start the OpenOCD daemon as follows.  This
assumes that you have already CD&#39;ed to the NuttX build directory:

  . ./setenv.sh
  oocd.sh $PWD

The setenv.sh script is a convenience script that you may choose to
use or not.  It simply sets up the PATH variable so that you can
automatically find oocd.sh.  You could also do:

  boards/arm/lpc17xx_40xx/lx_cpu/tools/oocd.sh $PWD
</code></pre><p>Connecting GDB</p><pre><code>Once the OpenOCD daemon has been started, you can connect to it via
GDB using the following GDB command:

  arm-nuttx-elf-gdb
  (gdb) target remote localhost:3333

NOTE:  The name of your GDB program may differ.  For example, with the
CodeSourcery toolchain, the ARM GDB would be called arm-none-eabi-gdb.

OpenOCD will support several special &#39;monitor&#39; sub-commands.  You can
use the &#39;monitor&#39; (or simply &#39;mon&#39;) command to invoke these sub-
commands. These GDB commands will send comments to the OpenOCD monitor.
Here are a couple that you will need to use:

 (gdb) monitor reset
 (gdb) monitor halt

NOTES:

1. The MCU must be halted using &#39;monitor halt&#39; prior to loading code.

2. &#39;monitor reset&#39; will restart the processor after loading code.

3. The &#39;monitor&#39; command can be abbreviated as just &#39;mon&#39;.

After starting GDB, you can load the NuttX ELF file like this:

  (gdb) mon halt
  (gdb) load nuttx

NOTES:

1. NuttX should have been built so that it has debugging symbols
   (by setting CONFIG_DEBUG_SYMBOLS=y in the .config file).

2. The MCU must be halted prior to loading code.

3. I find that there are often undetected write failures when using
   the Olimex ARM-USB-OCD debugber and that if you start the program
   with a bad FLASH failure, it will lock up OpenOCD.  I usually
   oad nuttx twice, restarting OpenOCD in between in order to assure
   good FLASH contents:

  (gdb) mon halt
  (gdb) load nuttx
  (gdb) mon reset

  Exit GDB, kill the OpenOCD server, recycle power on the board,
  restart the OpenOCD server and GDB, then:

  (gdb) mon halt
  (gdb) load nuttx
  (gdb) mon reset

  Other debuggers may not have these issues and such drastic steps may
  not be necessary.
</code></pre><h1 id="loading-code-with-the-isp-board" tabindex="-1">Loading Code with the ISP Board <a class="header-anchor" href="#loading-code-with-the-isp-board" aria-label="Permalink to &quot;Loading Code with the ISP Board&quot;">​</a></h1><p>Use can also load code onto the board using the WaveShare and the UART0 ISP/VCOM board. I use the FlashMagic program for Windows available here: <a href="http://www.flashmagictool.com/" target="_blank" rel="noreferrer">http://www.flashmagictool.com/</a> . It is so easy to use that no further explanation should be necessary: Just select the LPC1788, the ISP COM port, and the NuttX .hex file and program it.</p><h1 id="configuration" tabindex="-1">CONFIGURATION <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;CONFIGURATION&quot;">​</a></h1><h2 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h2><p>Configures the NuttShell (nsh) located at examples/nsh. The Configuration enables only the serial NSH interface.</p><pre><code>NOTES:

1. This configuration uses the mconf-based configuration tool.  To
   change this configuration using that tool, you should:

   a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
      see additional README.txt files in the NuttX tools repository./README.txt.

   b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
      reconfiguration process.

2. Uses the older, OABI, buildroot toolchain.  But that is easily
   reconfigured:

   CONFIG_ARM_TOOLCHAIN_BUILDROOT=y : Buildroot toolchain
   CONFIG_ARM_TOOLCHAIN_BUILDROOT_OABI=y      : Older, OABI toolchain

3. This NSH has support for built-in applications enabled, however,
   no built-in configurations are built in the defulat configuration.

4. This configuration has DMA-based SD card support enabled by
   default.  That support can be disabled as follow:

   CONFIG_LPC17_GPDMA=n                : No DMA
   CONFIG_ARCH_DMA=n
   CONFIG_LPC17_SDCARD=n               : No SD card driver
   CONFIG_SDIO_DMA=n                   : No SD card DMA
   CONFIG_MMCSD=n                      : No MMC/SD driver support
   CONFIG_FS_FAT=n                     : No FAT file system support

5. This configuration has been used for verifying SDRAM by modifying
   the configuration in the following ways:

   CONFIG_LPC17_EMC=y                  : Enable the EMC
   CONFIG_LPC17_EXTDRAM=y               : Configure external DRAM
   CONFIG_LPC17_EXTDRAMSIZE=67108864    : DRAM size 2x256/8 = 64MB
   CONFIG_TESTING_RAMTEST=y             : Enable the RAM test built-in

   In this configuration, the SDRAM is not added to heap and so is
   not excessible to the applications.  So the RAM test can be
   freely executed against the SRAM memory beginning at address
   0xa000:0000 (CS0).

6. This configuration has been used for verifying the touchscreen on
   on the 4.3&quot; LCD module.

   a) As of this writing, this touchscreen is still not functional.
      Rommel Marcelo has tracked this problem down to noise on the
      PENIRQ interrupt.  There are so many false interrupts that
      the NuttX interrupt-driven touchscreen driver cannot be used.
      Other compatible LCDs, however, may not have this issue.

   b) You can enable the touchscreen by modifying the configuration
      in the following ways:

      Drivers:
        CONFIG_INPUT=y                    : Enable support for input devices
        CONFIG_INPUT_ADS7843E=y           : Enable support for the XPT2048
        CONFIG_ADS7843E_SPIDEV=1          : Use SSP1 for communication
        CONFIG_SPI=y                      : Enable SPI support
        CONFIG_SPI_EXCHANGE=n             : exchange() method is not supported

      System Type:
        CONFIG_GPIO_IRQ=y                 : GPIO interrupt support
        CONFIG_LPC17_SSP1=y               : Enable support for SSP1

      Library Support:
        CONFIG_SCHED_WORKQUEUE=y          : Work queue support required

      Application Configuration:
        CONFIG_EXAMPLES_TOUCHSCREEN=y     : Enable the touchscreen built-int test

      Defaults should be okay for related touchscreen settings.  Touchscreen
      debug output can be enabled with:

      Build Setup:
        CONFIG_DEBUG=y                    : Enable debug features
        CONFIG_DEBUG_VERBOSE=y            : Enable verbose debug output
        CONFIG_DEBUG_INPUT=y              : Enable debug output from input devices

   c) You will also have to disable SD card support to use this test.  The
      SD card detect (CD) signal is on P0[13].  This signal is shared.  It
      is also used for MOSI1 and USB_UP_LED.  The CD pin may be disconnected.
      There is a jumper on board that enables the CD pin.  OR, you can simply
      remove the SD module so that it does not drive the CD pin.

      Drivers:
        CONFIG_MMCSD=n                    : No MMC/SD driver support

      System Type:
        CONFIG_LPC17_GPDMA=n              : No DMA
        CONFIG_LPC17_SDCARD=n             : No SD card driver
        CONFIG_SDIO_DMA=n                 : No SD card DMA
        CONFIG_ARCH_DMA=n

      File Systems:
        CONFIG_FS_FAT=n                   : No FAT file system support

      For touchscreen debug output:

      Build Setup:
        CONFIG_DEBUG=y
        CONFIG_DEBUG_VERBOSE=y
        CONFIG_DEBUG_INPUT=y

7. The button test (apps/examples/buttons) can be built-in by adding
   the following options.  See apps/examples/README.txt for further
   information about the button test.

   System Type:
     CONFIG_GPIO_IRQ=y

   Board Selection:
    CONFIG_ARCH_BUTTONS=y
    CONFIG_ARCH_IRQBUTTONS=y

    Application Configuration:
    CONFIG_EXAMPLES_BUTTONS=y
    CONFIG_EXAMPLES_BUTTONS_MIN=0
    CONFIG_EXAMPLES_BUTTONS_MAX=7
    CONFIG_EXAMPLES_IRQBUTTONS_MIN=1
    CONFIG_EXAMPLES_IRQBUTTONS_MAX=7
    CONFIG_EXAMPLES_BUTTONS_NAME0=&quot;USER1&quot;
    CONFIG_EXAMPLES_BUTTONS_NAME1=&quot;USER2&quot;
    CONFIG_EXAMPLES_BUTTONS_NAME2=&quot;USER3&quot;
    CONFIG_EXAMPLES_BUTTONS_NAME3=&quot;JOYSTICK_A&quot;
    CONFIG_EXAMPLES_BUTTONS_NAME4=&quot;JOYSTICK_B&quot;
    CONFIG_EXAMPLES_BUTTONS_NAME5=&quot;JOYSTICK_C&quot;
    CONFIG_EXAMPLES_BUTTONS_NAME6=&quot;JOYSTICK_D&quot;
    CONFIG_EXAMPLES_BUTTONS_NAME7=&quot;JOYSTICK_CTR&quot;
</code></pre>`,37)]))}const _=n(i,[["render",s]]);export{p as __pageData,_ as default};
