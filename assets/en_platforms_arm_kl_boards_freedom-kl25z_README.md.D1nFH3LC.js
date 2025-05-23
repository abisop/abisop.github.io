import{_ as n,c as o,al as t,o as i}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"README.txt","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/kl/boards/freedom-kl25z/README.md","filePath":"en/platforms/arm/kl/boards/freedom-kl25z/README.md"}'),a={name:"en/platforms/arm/kl/boards/freedom-kl25z/README.md"};function r(s,e,l,d,h,c){return i(),o("div",null,e[0]||(e[0]=[t(`<h1 id="readme-txt" tabindex="-1">README.txt <a class="header-anchor" href="#readme-txt" aria-label="Permalink to &quot;README.txt&quot;">​</a></h1><p>This is the README file for the port of NuttX to the Freescale Freedom KL25Z board. This board has the MKL25Z128 chip with a built-in SDA debugger.</p><h1 id="contents" tabindex="-1">Contents <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;Contents&quot;">​</a></h1><ul><li>Development Environment</li><li>GNU Toolchain Options</li><li>NuttX Buildroot Toolchain</li><li>LEDs</li><li>Serial Console</li><li>mbed</li><li>Freedom KL25Z-specific Configuration Options</li><li>Configurations</li></ul><h1 id="development-environment" tabindex="-1">Development Environment <a class="header-anchor" href="#development-environment" aria-label="Permalink to &quot;Development Environment&quot;">​</a></h1><p>Either Linux or Cygwin under Windows can be used for the development environment. The source has been built only using the GNU toolchain (see below). Other toolchains will likely cause problems.</p><h1 id="gnu-toolchain-options" tabindex="-1">GNU Toolchain Options <a class="header-anchor" href="#gnu-toolchain-options" aria-label="Permalink to &quot;GNU Toolchain Options&quot;">​</a></h1><p>As of this writing, all testing has been performed using the NuttX buildroot toolchain described below. I have also verified the build using the CodeSourcery GCC toolchain for windows. Most any contemporary EABI GCC toolchain should work will a little tinkering.</p><h1 id="nuttx-buildroot-toolchain" tabindex="-1">NuttX Buildroot Toolchain <a class="header-anchor" href="#nuttx-buildroot-toolchain" aria-label="Permalink to &quot;NuttX Buildroot Toolchain&quot;">​</a></h1><p>A GNU GCC-based toolchain is assumed. The PATH environment variable should be modified to point to the correct path to the Cortex-M0 GCC toolchain (if different from the default in your PATH variable).</p><p>If you have no Cortex-M0 toolchain, one can be downloaded from the NuttX Bitbucket download site (<a href="https://bitbucket.org/nuttx/buildroot/downloads/" target="_blank" rel="noreferrer">https://bitbucket.org/nuttx/buildroot/downloads/</a>). This GNU toolchain builds and executes in the Linux or Cygwin environment.</p><ol><li><p>You must have already configured NuttX in <code>&lt;some-dir&gt;</code>/nuttx.</p><p>tools/configure.sh freedom-kl25z:<code>&lt;sub-dir&gt;</code></p></li><li><p>Download the latest buildroot package into <code>&lt;some-dir&gt;</code></p></li><li><p>unpack the buildroot tarball. The resulting directory may have versioning information on it like buildroot-x.y.z. If so, rename <code>&lt;some-dir&gt;</code>/buildroot-x.y.z to <code>&lt;some-dir&gt;</code>/buildroot.</p></li><li><p>cd <code>&lt;some-dir&gt;</code>/buildroot</p></li><li><p>cp boards/cortexm0-eabi-defconfig-4.6.3 .config</p></li><li><p>make oldconfig</p></li><li><p>make</p></li><li><p>Make sure that the PATH variable includes the path to the newly built binaries.</p></li></ol><p>See the file boards/README.txt in the buildroot source tree. That has more details PLUS some special instructions that you will need to follow if you are building a Cortex-M0 toolchain for Cygwin under Windows.</p><h1 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h1><p>The Freedom KL25Z has a single RGB LED driven by the KL25Z as follows:</p><pre><code>------------- --------
RGB LED       KL25Z128
------------- --------
Red Cathode   PTB18
Green Cathode PTB19
Blue Cathode  PTD1
</code></pre><p>NOTE: PTD1 is also connected to the I/O header on J2 pin 10 (also known as D13).</p><p>If CONFIG_ARCH_LEDs is defined, then NuttX will control the LED on board the Freedom KL25Z. The following definitions describe how NuttX controls the LEDs:</p><pre><code>SYMBOL                Meaning                 LED state
                                              Initially all LED is OFF
-------------------  -----------------------  --------------------------
LED_STARTED          NuttX has been started   R=OFF G=OFF B=OFF
LED_HEAPALLOCATE     Heap has been allocated  (no change)
LED_IRQSENABLED      Interrupts enabled       (no change)
LED_STACKCREATED     Idle stack created       R=OFF G=OFF B=ON
LED_INIRQ            In an interrupt          (no change)
LED_SIGNAL           In a signal handler      (no change)
LED_ASSERTION        An assertion failed      (no change)
LED_PANIC            The system has crashed   R=FLASHING G=OFF B=OFF
LED_IDLE             K25Z1XX is in sleep mode (Optional, not used)
</code></pre><h1 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h1><p>As with most NuttX configurations, the Freedom KL25Z configurations depend on having a serial console to interact with the software. The Freedom KL25Z, however, has no on-board RS-232 drivers so will be necessary to connect the Freedom KL25Z UART pins to an external RS-232 driver board or TTL-to-Serial USB adaptor.</p><p>By default UART0 is used as the serial console on this boards. The UART0 is configured to work with the OpenSDA USB CDC/ACM port:</p><pre><code>------ ------------------------------- -----------------------------
PIN    PIN FUNCTIONS                   BOARD SIGNALS
------ ------------------------------- -----------------------------
Pin 27 PTA1/TSI0_CH2/UART0_RX/FTM2_CH0 UART1_RX_TGTMCU and D0 (PTA1)
Pin 28 PTA2/TSI0_CH3/UART0_TX/FTM2_CH1 UART1_TX_TGTMCU and D1 (PTA2)
</code></pre><p>But the UART0 Tx/Rx signals are also available on J1:</p><pre><code>---------------- ---------
UART0 SIGNAL     J1 pin
---------------- ---------
UART0_RX (PTA1)  J1, pin 2
UART0_TX (PTA2)  J1, pin 4
</code></pre><p>Ground is available on J2 pin 14. 3.3V is available on J3 and J4.</p><h1 id="mbed" tabindex="-1">mbed <a class="header-anchor" href="#mbed" aria-label="Permalink to &quot;mbed&quot;">​</a></h1><p>The Freedom KL25Z includes a built-in SDA debugger. An alternative to the SDA bootloader is this boot loader from mbed:</p><pre><code>http://mbed.org/handbook/mbed-FRDM-KL25Z-Getting-Started
http://mbed.org/handbook/Firmware-FRDM-KL25Z
</code></pre><p>Using the mbed loader:</p><ol><li>Connect the KL25Z to the host PC using the USB connector labeled SDA.</li><li>A new file system will appear called MBED; open it with Windows Explorer (assuming that you are using Windows).</li><li>Drag and drop nuttx.bin into the MBED window. This will load the nuttx.bin binary into the KL25Z. The MBED window will close then re-open and the KL25Z will be running the new code.</li></ol><p>Using the Freescale SDA debugger is essentially the same. That debugger will also accept .hex file.</p><h1 id="freedom-kl25z-specific-configuration-options" tabindex="-1">Freedom KL25Z-specific Configuration Options <a class="header-anchor" href="#freedom-kl25z-specific-configuration-options" aria-label="Permalink to &quot;Freedom KL25Z-specific Configuration Options&quot;">​</a></h1><pre><code>CONFIG_ARCH - Identifies the arch/ subdirectory.  This should
   be set to:

   CONFIG_ARCH=arm

CONFIG_ARCH_family - For use in C code:

   CONFIG_ARCH_ARM=y

CONFIG_ARCH_architecture - For use in C code:

   CONFIG_ARCH_CORTEXM0=y

CONFIG_ARCH_CHIP - Identifies the arch/*/chip subdirectory

   CONFIG_ARCH_CHIP=kl

CONFIG_ARCH_CHIP_name - For use in C code to identify the exact
   chip:

   CONFIG_ARCH_CHIP_MKL25Z128=y

CONFIG_ARCH_BOARD - Identifies the boards/ subdirectory and
   hence, the board that supports the particular chip or SoC.

   CONFIG_ARCH_BOARD=freedom-kl25z (for the Freescale FRDM-KL25Z development board)

CONFIG_ARCH_BOARD_name - For use in C code

   CONFIG_ARCH_BOARD_FREEDOM_K25Z128=y

CONFIG_ARCH_LOOPSPERMSEC - Must be calibrated for correct operation
   of delay loops

CONFIG_ENDIAN_BIG - define if big endian (default is little
   endian)

CONFIG_RAM_SIZE - Describes the installed DRAM (SRAM in this case):

   CONFIG_RAM_SIZE=16384 (16Kb)

CONFIG_RAM_START - The start address of installed DRAM

   CONFIG_RAM_START=0x20000000

CONFIG_ARCH_LEDS - Use LEDs to show state. Unique to boards that
   have LEDs

CONFIG_ARCH_INTERRUPTSTACK - This architecture supports an interrupt
   stack. If defined, this symbol is the size of the interrupt
   stack in bytes.  If not defined, the user task stacks will be
   used during interrupt handling.

CONFIG_ARCH_STACKDUMP - Do stack dumps after assertions

CONFIG_ARCH_LEDS -  Use LEDs to show state. Unique to board architecture.
</code></pre><p>Individual subsystems can be enabled as follows. These settings are for all of the K25Z100/120 line and may not be available for the MKL25Z128 in particular:</p><p>AHB ---</p><pre><code>CONFIG_KL_PDMA    Peripheral DMA
CONFIG_KL_FMC     Flash memory
CONFIG_KL_EBI     External bus interface
</code></pre><p>APB1 ----</p><pre><code>CONFIG_KL_WDT     Watchdog timer
CONFIG_KL_RTC     Real time clock (RTC)
CONFIG_KL_TMR0    Timer0
CONFIG_KL_TMR1    Timer1
CONFIG_KL_I2C0    I2C interface
CONFIG_KL_SPI0    SPI0 master/slave
CONFIG_KL_SPI1    SPI1 master/slave
CONFIG_KL_PWM0    PWM0
CONFIG_KL_PWM1    PWM1
CONFIG_KL_PWM2    PWM2
CONFIG_KL_PWM3    PWM3
CONFIG_KL_UART0   UART0
CONFIG_KL_USBD    USB 2.0 FS device controller
CONFIG_KL_ACMP    Analog comparator
CONFIG_KL_ADC     Analog-digital-converter (ADC)
</code></pre><p>APB2 ---</p><pre><code>CONFIG_KL_PS2     PS/2 interface
CONFIG_KL_TIMR2   Timer2
CONFIG_KL_TIMR3   Timer3
CONFIG_KL_I2C1    I2C1 interface
CONFIG_KL_SPI2    SPI2 master/slave
CONFIG_KL_SPI3    SPI3 master/slave
CONFIG_KL_PWM4    PWM4
CONFIG_KL_PWM5    PWM5
CONFIG_KL_PWM6    PWM6
CONFIG_KL_PWM7    PWM7
CONFIG_KL_UART1   UART1
CONFIG_KL_UART2   UART2
CONFIG_KL_I2S     I2S interface
</code></pre><p>K25Z1XX specific device driver settings</p><pre><code>CONFIG_UARTn_SERIAL_CONSOLE - Selects the UARTn (n=0,1,2) for the
  console and ttys0.
CONFIG_UARTn_RXBUFSIZE - Characters are buffered as received.
   This specific the size of the receive buffer for UARTn.
CONFIG_UARTn_TXBUFSIZE - Characters are buffered before
   being sent.  This specific the size of the transmit buffer
   for UARTn.
CONFIG_UARTn_BAUD - The configure BAUD of UARTn,
CONFIG_UARTn_BITS - The number of bits.  Must be 5, 6, 7, or 8.
CONFIG_UARTn_PARTIY - 0=no parity, 1=odd parity, 2=even parity
CONFIG_UARTn_2STOP - Two stop bits
</code></pre><h1 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h1><p>Each FREEDOM-KL25Z configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh freedom-kl25z:&lt;subdir&gt;
</code></pre><p>If this is a Windows native build, then configure.bat should be used instead of configure.sh:</p><pre><code>configure.bat freedom-kl25z\\&lt;subdir&gt;
</code></pre><p>Where <code>&lt;subdir&gt;</code> is one of the following:</p><h2 id="nsh" tabindex="-1">nsh: <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh:&quot;">​</a></h2><p>Configures the NuttShell (nsh) located at apps/examples/nsh. The Configuration enables the serial interface on UART0. Support for builtin applications is disabled.</p><pre><code>NOTES:

1. This configuration uses the mconf-based configuration tool.  To
   change this configuration using that tool, you should:

   a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
      see additional README.txt files in the NuttX tools repository.

   b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
      reconfiguration process.

2. By default, this configuration uses the ARM EABI toolchain
   for Windows and builds under Cygwin (or probably MSYS).  That
   can easily be reconfigured, of course.

   CONFIG_HOST_WINDOWS=y                   : Builds under Windows
   CONFIG_WINDOWS_CYGWIN=y                 : Using Cygwin
   CONFIG_ARM_TOOLCHAIN_GNU_EABI=y      : GNU EABI toolchain for Windows

3. Serial Console.  A serial console is necessary to interrupt with
   NSH.   The serial console is configured on UART0 which is available
   on J1:

   ---------------- ---------
   UART0 SIGNAL     J1 pin
   ---------------- ---------
   UART0_RX (PTA1)  J1, pin 2
   UART0_TX (PTA2)  J1, pin 4

   Ground is available on J2 pin 14.  3.3V is available on J3 and J4.

   It is possible to configure NSH to use a USB serial console instead
   of an RS-232 serial console.  However, that configuration has not
   been implemented as of this writing.

4. Memory Usage.  The size command gives us the static memory usage.
   This is what I get:

   $ size nuttx
      text    data     bss     dec     hex filename
     35037     106    1092   36235    8d8b nuttx

   And we can get the runtime memory usage from the NSH free command:

   NuttShell (NSH) NuttX-6.25
   nsh&gt; free
        total  used free  largest
   Mem: 14160  3944 10216 10216
   nsh&gt;

   Summary:

   - This slightly tuned NSH example uses 34.2KB of FLASH leaving 93.8KB
     of FLASH (72%) free from additional application development.

     I did not do all of the arithmetic, but it appears to me that of this
     34+KB of FLASH usage, probably 20-30% of the FLASH is used by libgcc!
     libgcc has gotten very fat!

   - Static SRAM usage is about 1.2KB (&lt;4%).

   - At run time, 10.0KB of SRAM (62%) is still available for additional
     applications. Most of the memory used at runtime is allocated I/O
     buffers and the stack for the NSH main thread (1.5KB).

   There is probably enough free memory to support 3 or 4 application
   threads in addition to NSH.

5. This configurations has support for NSH built-in applications.  However,
   in the default configuration no built-in applications are enabled.
</code></pre>`,52)]))}const f=n(a,[["render",r]]);export{p as __pageData,f as default};
