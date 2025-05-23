import{_ as t,c as o,al as n,o as i}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"README","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/samv7/boards/same70-qmtech/README.md","filePath":"en/platforms/arm/samv7/boards/same70-qmtech/README.md"}'),a={name:"en/platforms/arm/samv7/boards/same70-qmtech/README.md"};function r(s,e,l,h,d,c){return i(),o("div",null,e[0]||(e[0]=[n(`<h1 id="readme" tabindex="-1">README <a class="header-anchor" href="#readme" aria-label="Permalink to &quot;README&quot;">​</a></h1><p>This README file discusses the port of NuttX to the Atmel SAM E70 board from QMTECH. This board features the ATSAME70N19 Cortex-M7 microcontroller.</p><h1 id="contents" tabindex="-1">Contents <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;Contents&quot;">​</a></h1><ul><li>Status/Open Issues</li><li>Serial Console</li><li>SD card</li><li>Automounter</li><li>LEDs and Buttons</li><li>Program FLASH Access</li><li>SPI Slave</li><li>Tickless OS</li><li>Debugging</li><li>Using OpenOCD and GDB to flash via the EDBG chip</li><li>Configurations</li></ul><h1 id="status-open-issues" tabindex="-1">Status/Open Issues <a class="header-anchor" href="#status-open-issues" aria-label="Permalink to &quot;Status/Open Issues&quot;">​</a></h1><p>2015-11-30: The basic NSH configuration is function with serial console via the EDBG VCOM and LED and buttons support. SD card slot also appear to be fully functional.</p><p>See also boards/arm/samv7/samv70-xplained/README.txt</p><h1 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h1><p>The SAME70-QMTECH has no on-board RS-232 drivers so it will be necessary to use either the VCOM or an external RS-232 driver. Here are some options.</p><ul><li><p>Arduino Serial Shield: One option is to use an Arduino-compatible serial shield. This will use the RXD and TXD signals available at pins 0 an 1, respectively, of the Arduino &quot;Digital Low&quot; connector. On the SAME70-QMTECH board, this corresponds to UART3:</p><hr><p>Pin on SAME70 Arduino Arduino SAME70 J503 PIO Name Pin Function</p><hr><p>1 2 PD28 D0/RX0 0 1 URXD3 PD30 D1/TX0 UTXD3</p><hr><p>In this configuration, an external RS232 driver can also be used instead of the shield. Simply connext as follows:</p><hr><p>Arduino RS-232 Pin Label Connection</p><hr><p>D0 (RXD) RX TX GND D1 (TXD) Vcc GND 5VO</p><hr></li></ul><h1 id="sd-card" tabindex="-1">SD Card <a class="header-anchor" href="#sd-card" aria-label="Permalink to &quot;SD Card&quot;">​</a></h1><h2 id="card-slot" tabindex="-1">Card Slot <a class="header-anchor" href="#card-slot" aria-label="Permalink to &quot;Card Slot&quot;">​</a></h2><p>The SAM E70 QMTECH has one standard SD card connector that is connected to the High Speed Multimedia Card Interface (HSMCI) of the SAM E70. SD card connector:</p><hr><p>SAME70 SAME70 Function Pin</p><hr><p>PA30 MCDA0 (DAT0) PA31 MCDA1 (DAT1) PA26 MCDA2 (DAT2) PA27 MCDA3 (DAT3) MCCK PA25 (CLK) MCCDA (CMD) PA28 N/A Card Detect (C/D)</p><hr><h2 id="configuration-settings" tabindex="-1">Configuration Settings <a class="header-anchor" href="#configuration-settings" aria-label="Permalink to &quot;Configuration Settings&quot;">​</a></h2><p>Enabling HSMCI support. The SAME70-QMTECH provides a one, full-size SD memory card slots. The full size SD card slot connects via HSMCI0. Support for the SD slots can be enabled with the following settings:</p><p>System Type-&gt;SAMV7 Peripheral Selection CONFIG_SAMV7_HSMCI0=y : To enable HSMCI0 support CONFIG_SAMV7_XDMAC=y : XDMAC is needed by HSMCI0/1</p><p>System Type CONFIG_SAMV7_GPIO_IRQ=y : PIO interrupts needed CONFIG_SAMV7_GPIOD_IRQ=y : Card detect pin is on PD18</p><p>Device Drivers -&gt; MMC/SD Driver Support CONFIG_MMCSD=y : Enable MMC/SD support CONFIG_MMSCD_NSLOTS=1 : One slot per driver instance CONFIG_MMCSD_MULTIBLOCK_LIMIT=1 : (REVISIT) CONFIG_MMCSD_HAVE_CARDDETECT=y : Supports card-detect PIOs CONFIG_MMCSD_MMCSUPPORT=n : Interferes with some SD cards CONFIG_MMCSD_SPI=n : No SPI-based MMC/SD support CONFIG_MMCSD_SDIO=y : SDIO-based MMC/SD support CONFIG_SDIO_DMA=y : Use SDIO DMA CONFIG_SDIO_BLOCKSETUP=y : Needs to know block sizes</p><p>RTOS Features -&gt; Work Queue Support CONFIG_SCHED_WORKQUEUE=y : Driver needs work queue support</p><p>Application Configuration -&gt; NSH Library CONFIG_NSH_ARCHINIT=y : NSH board-initialization, OR CONFIG_BOARD_LATE_INITIALIZE=y</p><h2 id="using-the-sd-card" tabindex="-1">Using the SD card <a class="header-anchor" href="#using-the-sd-card" aria-label="Permalink to &quot;Using the SD card&quot;">​</a></h2><ol><li><p>After booting, the HSCMI device will appear as /dev/mmcsd0.</p></li><li><p>If you try mounting an SD card with nothing in the slot, the mount will fail:</p><p>nsh&gt; mount -t vfat /dev/mmcsd0 /mnt/sd0 nsh: mount: mount failed: 19</p><p>NSH can be configured to provide errors as strings instead of numbers. But in this case, only the error number is reported. The error numbers can be found in nuttx/include/errno.h:</p><p>#define ENODEV 19 #define ENODEV_STR &quot;No such device&quot;</p><p>So the mount command is saying that there is no device or, more correctly, that there is no card in the SD card slot.</p></li><li><p>Inserted the SD card. Then the mount should succeed.</p><p>nsh&gt; mount -t vfat /dev/mmcsd0 /mnt/sd0 nsh&gt; ls /mnt/sd1 /mnt/sd1: atest.txt nsh&gt; cat /mnt/sd1/atest.txt This is a test</p><p>NOTE: See the next section entitled &quot;Auto-Mounter&quot; for another way to mount your SD card.</p></li><li><p>Before removing the card, you must umount the file system. This is equivalent to &quot;ejecting&quot; or &quot;safely removing&quot; the card on Windows: It flushes any cached data to an SD card and makes the SD card unavailable to the applications.</p><p>nsh&gt; umount -t /mnt/sd0</p><p>It is now safe to remove the card. NuttX provides into callbacks that can be used by an application to automatically unmount the volume when it is removed. But those callbacks are not used in these configurations.</p></li></ol><h1 id="auto-mounter" tabindex="-1">Auto-Mounter <a class="header-anchor" href="#auto-mounter" aria-label="Permalink to &quot;Auto-Mounter&quot;">​</a></h1><p>NuttX implements an auto-mounter than can make working with SD cards easier. With the auto-mounter, the file system will be automatically mounted when the SD card is inserted into the HSMCI slot and automatically unmounted when the SD card is removed.</p><p>Here is a sample configuration for the auto-mounter:</p><pre><code>File System Configuration
  CONFIG_FS_AUTOMOUNTER=y

Board-Specific Options
  CONFIG_SAMV7_HSMCI0_AUTOMOUNT=y
  CONFIG_SAMV7_HSMCI0_AUTOMOUNT_FSTYPE=&quot;vfat&quot;
  CONFIG_SAMV7_HSMCI0_AUTOMOUNT_BLKDEV=&quot;/dev/mmcsd0&quot;
  CONFIG_SAMV7_HSMCI0_AUTOMOUNT_MOUNTPOINT=&quot;/mnt/sdcard&quot;
  CONFIG_SAMV7_HSMCI0_AUTOMOUNT_DDELAY=1000
  CONFIG_SAMV7_HSMCI0_AUTOMOUNT_UDELAY=2000
</code></pre><p>WARNING: SD cards should never be removed without first unmounting them. This is to avoid data and possible corruption of the file system. Certainly this is the case if you are writing to the SD card at the time of the removal. If you use the SD card for read-only access, however, then I cannot think of any reason why removing the card without mounting would be harmful.</p><h1 id="leds-and-buttons" tabindex="-1">LEDs and Buttons <a class="header-anchor" href="#leds-and-buttons" aria-label="Permalink to &quot;LEDs and Buttons&quot;">​</a></h1><h2 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h2><p>A single LED is available driven by PA14.</p><p>This LED is not used by the board port unless CONFIG_ARCH_LEDS is defined. In that case, the usage by the board port is defined in include/board.h and src/sam_autoleds.c. The LED is used to encode OS-related events as follows:</p><hr><p>SYMBOL Meaning LED</p><hr><p>LED_STARTED NuttX has been started OFF OFF OFF ON LED_HEAPALLOCATE Heap has been allocated N/C N/C N/C LED_IRQSENABLED Interrupts enabled Idle FLASH LED_STACKCREATED stack created In an<br> LED_INIRQ interrupt In a signal<br> LED_SIGNAL handler An assertion<br> LED_ASSERTION failed The system has<br> LED_PANIC crashed</p><p>us if the LED is tically on, NuttX has ccessfully sta parently, su rmally. If the LED booted and is, running no z, then is f r has been lashing at a fatal erro detected and approximately the system has halted.</p><h2 id="ttons" tabindex="-1">ttons <a class="header-anchor" href="#ttons" aria-label="Permalink to &quot;ttons&quot;">​</a></h2><p>SAM E70 QMTECH contains two mechanical buttons. One button is the RESET button connected to the SAM E70 reset line and the other, PA21, is a generic user configurable button. When a button is pressed it will drive the I/O line to GND.</p><p>NOTE: There are no pull-up resistors connected to the generic user buttons so it is necessary to enable the internal pull-up in the SAM E70 to use the button.</p><h1 id="spi-slave" tabindex="-1">SPI Slave <a class="header-anchor" href="#spi-slave" aria-label="Permalink to &quot;SPI Slave&quot;">​</a></h1><p>An interrupt driven SPI slave driver as added on 2015-08-09 but has not been verified as of this writing. See discussion in include/nuttx/spi/slave.h and below.</p><p>I do not yet have a design that supports SPI slave DMA. And, under certain, very limited conditions, I think it can be done. Those certain conditions are:</p><p>a) The master does not tie the chip select to ground. The master must raise chip select at the end of the transfer. Then I do not need to know the length of the transfer; I can cancel the DMA when the chip is de-selected.</p><p>b) The protocol includes a dummy read after sending the command. This is very common in SPI device and should not be an issue if it is specified. This dummy read time provides time to set up the DMA. So the protocol would be:</p><pre><code>i)  Master drops the chip select.
ii) Master sends the command which will indicate whether the master
    is reading, writing, or exchanging data. The master discards the
    garbage return value.
iii) Slave is interrupted when the command word is received. The SPI
     device then decodes the command word and setups up the
     subsequent DMA.
iv) Master sends a dummy word and discards the return value. During
    the bit times to shift the dummy word, the slave has time to set
    up the DMA.
v)  Master then reads or writes (or exchanges) the data If the DMA
    is in place, the transfer should continue normally.
vi) At the end of the data transfer the master raises the chip
    select.
</code></pre><p>c) There are limitations in the word time, i.e., the time between the interrupt for each word shifted in from the master.</p><p>The controller driver will get events after the receipt of each word in ii), iv), and v). The time between each word will be:</p><pre><code>word-time = nbits * bit time + inter-word-gap
</code></pre><p>So for an 8 bit interface at 20MHz, the words will be received from the master a 8 * 50nsec = 400 nsec + inter-word-gap. That is the time during which the dummy word would be shifted and during which we receive the interrupt for the command word, interpret the command word, and to set up the DMA for the remaining word transfer. I don&#39;t think that is possible, at least not at 20 MHz.</p><p>That is far too fast even for the interrupt driven solution that I have in place now. It could not work at 20MHz. If we suppose that interrupt processing is around 1 usec, then an 8 bit interface could not have bit times more than 125 nsec or 8 KHz. Interrupt handling should be faster than 1 usec, but not a lot faster. I have not benchmarked it. NuttX also supports special, zero latency interrupts that could bring the interrupt time down even more.</p><p>Note that we would also have a little more processing time if you used 16-bit SPI word size.</p><p>Note also that the interrupt driven approach would have this same basic performance limitation with the additional disadvantage that:</p><p>a) The driver will receive two interrupts per word exchanged:</p><pre><code>i)  One interrupt will be received when the word is shifted in from
    the master (at the end of 8-bit times). This is a data received
    interrupt.

ii) And another interrupt when the next words moved to the shift-out
    register, freeing up the transmit holding register. This is the
    data sent interrupt.

The ii) event should be very soon after the i) event.

Without DMA, the only way to reduce the interrupt rate would be to
add interrupt-level polling to detect the when transmit holding
register is available. That is not really a good idea.
</code></pre><p>b) It will hog all of the CPU for the duration of the transfer).</p><h1 id="tickless-os" tabindex="-1">Tickless OS <a class="header-anchor" href="#tickless-os" aria-label="Permalink to &quot;Tickless OS&quot;">​</a></h1><h2 id="background" tabindex="-1">Background <a class="header-anchor" href="#background" aria-label="Permalink to &quot;Background&quot;">​</a></h2><p>By default, a NuttX configuration uses a periodic timer interrupt that drives all system timing. The timer is provided by architecture-specific code that calls into NuttX at a rate controlled by CONFIG_USEC_PER_TICK. The default value of CONFIG_USEC_PER_TICK is 10000 microseconds which corresponds to a timer interrupt rate of 100 Hz.</p><p>An option is to configure NuttX to operation in a &quot;tickless&quot; mode. Some limitations of default system timer are, in increasing order of importance:</p><ul><li>Overhead: Although the CPU usage of the system timer interrupt at 100Hz is really very low, it is still mostly wasted processing time. One most timer interrupts, there is really nothing that needs be done other than incrementing the counter.</li><li>Resolution: Resolution of all system timing is also determined by CONFIG_USEC_PER_TICK. So nothing that be time with resolution finer than 10 milliseconds be default. To increase this resolution, CONFIG_USEC_PER_TICK an be reduced. However, then the system timer interrupts use more of the CPU bandwidth processing useless interrupts.</li><li>Power Usage: But the biggest issue is power usage. When the system is IDLE, it enters a light, low-power mode (for ARMs, this mode is entered with the wfi or wfe instructions for example). But each interrupt awakens the system from this low power mode. Therefore, higher rates of interrupts cause greater power consumption.</li></ul><p>The so-called Tickless OS provides one solution to issue. The basic concept here is that the periodic, timer interrupt is eliminated and replaced with a one-shot, interval timer. It becomes event driven instead of polled: The default system timer is a polled design. On each interrupt, the NuttX logic checks if it needs to do anything and, if so, it does it.</p><p>Using an interval timer, one can anticipate when the next interesting OS event will occur, program the interval time and wait for it to fire. When the interval time fires, then the scheduled activity is performed.</p><h2 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;Configuration&quot;">​</a></h2><p>The following configuration options will enable support for the Tickless OS for the SAMV7 platforms using TC0 channels 0-3 (other timers or timer channels could be used making the obvious substitutions):</p><pre><code>RTOS Features -&gt; Clocks and Timers
  CONFIG_SCHED_TICKLESS=y          : Configures the RTOS in tickless mode
  CONFIG_SCHED_TICKLESS_ALARM=n    : (option not implemented)
  CONFIG_SCHED_TICKLESS_LIMIT_MAX_SLEEP=y

System Type -&gt; SAMV7 Peripheral Support
  CONFIG_SAMV7_TC0=y               : Enable TC0 (TC channels 0-3

System Type -&gt; Timer/counter Configuration
  CONFIG_SAMV7_ONESHOT=y           : Enables one-shot timer wrapper
  CONFIG_SAMV7_FREERUN=y           : Enabled free-running timer wrapper
  CONFIG_SAMV7_TICKLESS_ONESHOT=0  : Selects TC0 channel 0 for the one-shot
  CONFIG_SAMV7_TICKLESS_FREERUN=1  : Selects TC0 channel 1 for the free-
                                   : running timer
</code></pre><p>The resolution of the clock is provided by the CONFIG_USEC_PER_TICK setting in the configuration file.</p><p>NOTE: In most cases, the slow clock will be used as the timer/counter input. The SAME70-Xplained board has pads for a 32.768KHz crystal, however, the boad ships with that position unpopulated. So, be default this will probably end up using the slow RC oscillator which will give you very bad timing.</p><p>If you add a crystal to your board, you can select to use it with the definition BOARD_HAVE_SLOWXTAL in the boards/arm/samv7/same70-qmtech/board.h file.</p><p>The slow clock has a resolution of about 30.518 microseconds. Ideally, the value of CONFIG_USEC_PER_TICK should be the exact clock resolution. Otherwise there will be cumulative timing inaccuracies. But a choice choice of:</p><pre><code>CONFIG_USEC_PER_TICK=31
</code></pre><p>will have an error of 0.6% and will have inaccuracies that will effect the time due to long term error build-up.</p><p>Using the slow clock input, the Tickless support is functional, however, there are inaccuracies in delays. For example,</p><pre><code>nsh&gt; sleep 10
</code></pre><p>results in a delay of maybe 5.4 seconds. But the timing accuracy is correct if all competing uses of the interval timer are disabled (mostly from the high priority work queue). Therefore, I conclude that this inaccuracy is due to the inaccuracies in the representation of the clock rate. 30.518 usec cannot be represented accurately. Each timing calculation results in a small error. When the interval timer is very busy, long delays will be divided into many small pieces and each small piece has a large error in the calculation. The cumulative error is the cause of the problem.</p><p>Solution: The same70-qmtech/src/sam_boot.c file has additional logic to enable the programmable clock PCK6 as a clock source for the timer/counters if the Tickless mode is selected. The ideal frequency would be:</p><pre><code>frequency = 1,000,000 / CONFIG_USEC_PER_TICK
</code></pre><p>The main crystal is selected as the frequency source. The maximum prescaler value is 256 so the minimum frequency is 46,875 Hz which corresponds to a period of 21.3 microseconds. A value of CONFIG_USEC_PER_TICK=20, or 50KHz, would give an exact solution with a divider of 240.</p><h2 id="same70-timer-usage" tabindex="-1">SAME70 Timer Usage <a class="header-anchor" href="#same70-timer-usage" aria-label="Permalink to &quot;SAME70 Timer Usage&quot;">​</a></h2><p>This current implementation uses two timers: A one-shot timer to provide the timed events and a free running timer to provide the current time. Since timers are a limited resource, that could be an issue on some systems.</p><p>We could do the job with a single timer if we were to keep the single timer in a free-running at all times. The SAME70 timer/counters have 16-bit counters with the capability to generate a compare interrupt when the timer matches a compare value but also to continue counting without stopping (giving another, different interrupt when the timer rolls over from 0xffff to zero). So we could potentially just set the compare at the number of ticks you want PLUS the current value of timer. Then you could have both with a single timer: An interval timer and a free- running counter with the same timer! In this case, you would want to to set CONFIG_SCHED_TICKLESS_ALARM in the NuttX configuration.</p><p>Patches are welcome!</p><h1 id="debugging" tabindex="-1">Debugging <a class="header-anchor" href="#debugging" aria-label="Permalink to &quot;Debugging&quot;">​</a></h1><h2 id="edbg" tabindex="-1">EDBG <a class="header-anchor" href="#edbg" aria-label="Permalink to &quot;EDBG&quot;">​</a></h2><p>The on-board EDBG appears to work only with Atmel Studio. You can however, simply connect a SAM-ICE or J-Link to the JTAG/SWD connector on the board and that works great. The only tricky thing is getting the correct orientation of the JTAG connection.</p><h2 id="j-link-jtag" tabindex="-1">J-Link/JTAG <a class="header-anchor" href="#j-link-jtag" aria-label="Permalink to &quot;J-Link/JTAG&quot;">​</a></h2><p>I have been using Atmel Studio to write code to flash then I use the Segger J-Link GDB server to debug. I have been using the &#39;Device Programming&#39; I available under the Atmel Studio &#39;Tool&#39; menu. I have to disconnect the SAM-ICE while programming with the EDBG. I am sure that you could come up with a GDB server-only solution if you wanted.</p><p>I run GDB like this from the directory containing the NuttX ELF file:</p><pre><code>arm-none-eabi-gdb
(gdb) target remote localhost:2331
(gdb) mon reset
(gdb) file nuttx
(gdb) ... start debugging ...
</code></pre><h2 id="openocd-edbg" tabindex="-1">OpenOCD/EDBG <a class="header-anchor" href="#openocd-edbg" aria-label="Permalink to &quot;OpenOCD/EDBG&quot;">​</a></h2><p>Current OpenOCD also works with SAME70-QMTECH via EDBG, but I have not used OpenOCD with the board.</p><h2 id="sam-ba" tabindex="-1">SAM-BA <a class="header-anchor" href="#sam-ba" aria-label="Permalink to &quot;SAM-BA&quot;">​</a></h2><p>SAM-BA is another option. With SAM-BA, you can load code into FLASH over a serial port or USB connection by booting into the ROM bootloader.</p><h2 id="cmsis-dap-programmer" tabindex="-1">CMSIS-DAP Programmer <a class="header-anchor" href="#cmsis-dap-programmer" aria-label="Permalink to &quot;CMSIS-DAP Programmer&quot;">​</a></h2><p>Another useful tool for CMSIS-DAP programmer (formerly Atmel EDBG programmer) available at:</p><pre><code>https://github.com/ataradov/edbg
</code></pre><p>This is a simple command line utility for programming ARM-based MCUs (currently only Atmel) though CMSIS-DAP SWD interface. It works on Linux, macOS and Windows. Very useful to around especially if you have the following issue:</p><h2 id="booting-to-flash-or-the-rom-bootloader" tabindex="-1">Booting to FLASH or the ROM Bootloader <a class="header-anchor" href="#booting-to-flash-or-the-rom-bootloader" aria-label="Permalink to &quot;Booting to FLASH or the ROM Bootloader&quot;">​</a></h2><p>If you use EDBG or JTAG to load code into FLASH, you may be puzzled why the code does not run. It may be that you are booting into the ROM bootloader instead of FLASH. That can be fixed by modifying the SAME70&#39;s GPNVM bits.</p><p>If your SAME70 is booting in ROM by default, the GPNVM bits will probably looking something like:</p><pre><code>$ edbg.exe -F r,:, -t atmel_cm7
GPNVM Bits: 0x40
</code></pre><p>Where bit 1 = 0 boots into the ROM bootloader and bit 1 = 1 boots into FLASH. You want:</p><pre><code>$ edbg.exe -F r,:, -t atmel_cm7
GPNVM Bits: 0x42
</code></pre><p>If you are trying to use SAM-BA, you might have the opposity problem: The board might be booting into FLASH when you need it to boot into the ROM bootloader.</p><p>That GPNVM bit can be changed using CMSIS-DAP programmer, Atmel studio, or using this OpenOCD setup:</p><pre><code>atsamv gpnvm [(&#39;clr&#39;|&#39;set&#39;|&#39;show&#39;) bitnum]
  Without arguments, shows all bits in the gpnvm register.
  Otherwise, clears, sets, or shows one General Purpose Non-Volatile
  Memory (gpnvm) bit.
</code></pre><p>Perhaps SAM-BA supports a way to do this as well???</p><h1 id="using-openocd-and-gdb-to-flash-via-the-edbg-chip" tabindex="-1">Using OpenOCD and GDB to flash via the EDBG chip <a class="header-anchor" href="#using-openocd-and-gdb-to-flash-via-the-edbg-chip" aria-label="Permalink to &quot;Using OpenOCD and GDB to flash via the EDBG chip&quot;">​</a></h1><p>Building OpenOCD under Cygwin:</p><pre><code>Refer to boards/olimex-lpc1766stk/README.txt
</code></pre><p>Installing OpenOCD in Linux (but see note below):</p><pre><code>sudo apt-get install openocd
</code></pre><p>NOTE: At the time of writing installing the above openocd package from the distribution (Ubuntu 14.04) was not enough to get the latest openocd version supporting the SAME70 Xplained.</p><p>The code was obtained from the OpenOCD git repository, available at <a href="https://github.com/ntfreak/openocd" target="_blank" rel="noreferrer">https://github.com/ntfreak/openocd</a>.</p><pre><code>git clone https://github.com/ntfreak/openocd.git
</code></pre><p>Then follow the directions of the &quot;Building OpenOCD&quot; section of their README, but be sure to configure including the CMSIS-DAP interface:</p><pre><code>./bootstrap
./configure --enable-cmsis-dap
make
sudo make install
</code></pre><p>If your configure step fails, you might be missing some dependencies, i.e.:</p><pre><code>sudo apt-get install libhidapi-dev
</code></pre><p>Helper Scripts.</p><pre><code>OpenOCD requires a configuration file.  I keep the one I used last here:

  boards/arm/samv7/same70-qmtech/tools/atmel_same70_qmtech.cfg

However, the &quot;correct&quot; configuration script to use with OpenOCD may
change as the features of OpenOCD evolve.  So you should at least
compare that atmel_same70_qmtech.cfg file with configuration files in
/usr/share/openocd/scripts.  As of this writing, the configuration
files of interest were:

  /usr/share/openocd/scripts/interface/cmsis-dap.cfg
  /usr/share/openocd/scripts/board/atmel_same70_qmtech.cfg
  /usr/share/openocd/scripts/target/atsamv.cfg

There is also a script on the tools/ directory that I use to start
the OpenOCD daemon on my system called oocd.sh.  That script will
probably require some modifications to work in another environment:

- Possibly the value of OPENOCD_PATH and TARGET_PATH
- It assumes that the correct script to use is the one at
  boards/arm/samv7/same70-qmtech/tools/atmel_same70_qmtech.cfg
</code></pre><p>Starting OpenOCD</p><pre><code>Then you should be able to start the OpenOCD daemon like:

  boards/arm/samv7/same70-qmtech/tools/oocd.sh $PWD
</code></pre><p>Connecting GDB</p><pre><code>Once the OpenOCD daemon has been started, you can connect to it via
GDB using the following GDB command:

  arm-nuttx-elf-gdb
  (gdb) target remote localhost:3333

NOTE:  The name of your GDB program may differ.  For example, with the
CodeSourcery toolchain, the ARM GDB would be called arm-none-eabi-gdb.

After starting GDB, you can load the NuttX ELF file:

  (gdb) symbol-file nuttx
  (gdb) monitor reset
  (gdb) monitor halt
  (gdb) load nuttx

NOTES:
1. Loading the symbol-file is only useful if you have built NuttX to
   include debug symbols (by setting CONFIG_DEBUG_SYMBOLS=y in the
   .config file).
2. The MCU must be halted prior to loading code using &#39;mon reset&#39;
   as described below.

OpenOCD will support several special &#39;monitor&#39; commands.  These
GDB commands will send comments to the OpenOCD monitor.  Here
are a couple that you will need to use:

 (gdb) monitor reset
 (gdb) monitor halt

NOTES:
1. The MCU must be halted using &#39;mon halt&#39; prior to loading code.
2. Reset will restart the processor after loading code.
3. The &#39;monitor&#39; command can be abbreviated as just &#39;mon&#39;.
</code></pre><h1 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h1><h2 id="information-common-to-all-configurations" tabindex="-1">Information Common to All Configurations <a class="header-anchor" href="#information-common-to-all-configurations" aria-label="Permalink to &quot;Information Common to All Configurations&quot;">​</a></h2><p>Each SAME70-QMTECH configuration is maintained in a sub-directory and can be selected as follow:</p><p>tools/configure.sh same70-qmtech:<code>&lt;subdir&gt;</code></p><p>Before building, make sure that the PATH environment variable include the correct path to the directory than holds your toolchain binaries.</p><p>And then build NuttX by simply typing the following. At the conclusion of the make, the nuttx binary will reside in an ELF file called, simply, nuttx.</p><p>make oldconfig make</p><p>The <code>&lt;subdir&gt;</code> that is provided above as an argument to the tools/configure.sh must be is one of the following.</p><p>NOTES:</p><ol><li>These configurations use the mconf-based configuration tool. To change any of these configurations using that tool, you should:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- --&gt;</span></span></code></pre></div><pre><code>a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
   see additional README.txt files in the NuttX tools repository.

b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
   reconfiguration process.
</code></pre><ol start="2"><li><p>Unless stated otherwise, all configurations generate console output on USART1 (the EDBG VCOM)</p><p>NOTE: When USART1 is used, the pin PB4 is reconfigured. Normally, PB4 is TDI. When it is reconfigured for use with USART1, the capability to debug is lost! If you plan to debug you should most certainly not use USART1. UART3 might be a good option (the Arduino RXD/TXD):</p><p>-CONFIG_SAMV7_USART1=y -CONFIG_USART1_SERIALDRIVER=y -CONFIG_USART1_SERIAL_CONSOLE=y -CONFIG_USART1_RXBUFSIZE=256 -CONFIG_USART1_TXBUFSIZE=256 -CONFIG_USART1_BAUD=115200 -CONFIG_USART1_BITS=8 -CONFIG_USART1_PARITY=0 -CONFIG_USART1_2STOP=0</p><p>+CONFIG_SAMV7_UART3=y +CONFIG_UART3_SERIAL_CONSOLE=y +CONFIG_UART3_RXBUFSIZE=256 +CONFIG_UART3_TXBUFSIZE=256 +CONFIG_UART3_BAUD=115200 +CONFIG_UART3_BITS=8 +CONFIG_UART3_PARITY=0 +CONFIG_UART3_2STOP=0</p><p>UART3 is not the default because (1) the placement of the RJ-45 connector makes it difficult to install Arduino shield cards and (2) the Arduino connectors are not populated on the board as it comes from the factory.</p></li><li><p>All of these configurations are set up to build under Windows using the &quot;GNU Tools for ARM Embedded Processors&quot; that is maintained by ARM (unless stated otherwise in the description of the configuration).</p><p><a href="https://developer.arm.com/open-source/gnu-toolchain/gnu-rm" target="_blank" rel="noreferrer">https://developer.arm.com/open-source/gnu-toolchain/gnu-rm</a></p><p>That toolchain selection can easily be reconfigured using &#39;make menuconfig&#39;. Here are the relevant current settings:</p><p>Build Setup: CONFIG_HOST_WINDOWS=y : Window environment CONFIG_WINDOWS_CYGWIN=y : Cywin under Windows</p><p>System Type -&gt; Toolchain: CONFIG_ARM_TOOLCHAIN_GNU_EABI=y : GNU ARM EABI toolchain</p><p>NOTE: As of this writing, there are issues with using this tool at the -Os level of optimization. This has not been proven to be a compiler issue (as least not one that might not be fixed with a well placed volatile qualifier). However, in any event, it is recommend that you use not more that -O2 optimization.</p></li></ol><h2 id="configuration-sub-directories" tabindex="-1">Configuration sub-directories <a class="header-anchor" href="#configuration-sub-directories" aria-label="Permalink to &quot;Configuration sub-directories&quot;">​</a></h2><p>adc</p><pre><code>This is a basic nsh configuration (se below) with added example for
ADC (AFEC) driver. Data can be read through channel AFE0_AD0 by
running application &quot;adc&quot; in NuttShell.

The ADC is triggered by Timer/counter at 1 kHz frequency and uses
DMA to transfer samples. Number of transferred samples can be set
by configuring CONFIG_SAMV7_AFEC_DMASAMPLES.
</code></pre><p>nsh:</p><pre><code>Configures the NuttShell (nsh) located at examples/nsh.  There are two
very similar NSH configurations:

  - nsh.  This configuration is focused on low level, command-line
    driver testing.  It has no network.
  - netnsh.  This configuration is focused on network testing and
    has only limited command support.

NOTES:

1. The serial console is configured by default for use with the EDBG VCOM
   (USART1).  You will need to reconfigure if you will to use a different
   U[S]ART.  See &quot;Information Common to All Configurations&quot; above.

2. Default stack sizes are large and should really be tuned to reduce
   the RAM footprint:

     CONFIG_ARCH_INTERRUPTSTACK=2048
     CONFIG_IDLETHREAD_STACKSIZE=1024
     CONFIG_INIT_STACKSIZE=2048
     CONFIG_PTHREAD_STACK_DEFAULT=2048
     ... and others ...

3. NSH built-in applications are supported.

   Binary Formats:
     CONFIG_BUILTIN=y           : Enable support for built-in programs

   Application Configuration:
     CONFIG_NSH_BUILTIN_APPS=y  : Enable starting apps from NSH command line

4. Support for HSMCI is built-in by default. The SAME70-QMTECH provides
   one full-size SD memory card slot.  Refer to the section entitled
   &quot;SD card&quot; for configuration-related information.

   See &quot;Open Issues&quot; above for issues related to HSMCI.

   The auto-mounter is not enabled.  See the section above entitled
   &quot;Auto-Mounter&quot;.

5. Performance-related Configuration settings:

   CONFIG_ARMV7M_ICACHE=y                : Instruction cache is enabled
   CONFIG_ARMV7M_DCACHE=y                : Data cache is enabled
   CONFIG_ARMV7M_DCACHE_WRITETHROUGH=n   : Write back mode
   CONFIG_ARCH_FPU=y                     : H/W floating point support is enabled
   CONFIG_ARCH_DPFPU=y                   : 64-bit H/W floating point support is enabled

   # CONFIG_ARMV7M_ITCM is not set       : Support not yet in place
   # CONFIG_ARMV7M_DTCM is not set       : Support not yet in place

   Stack sizes are also large to simplify the bring-up and should be
   tuned for better memory usages.

STATUS:
2015-03-28: HSMCI TX DMA is disabled.  There are some issues with the TX
  DMA that need to be corrected.
</code></pre><p>mcuboot-loader: This configuration exercises the port of MCUboot loader to NuttX.</p><pre><code>In this configuration both primary, secondary and scratch partitions are
mapped into the internal flash.
Relevant configuration settings:

  CONFIG_BOARD_LATE_INITIALIZE=y

  CONFIG_BOOT_MCUBOOT=y
  CONFIG_MCUBOOT_BOOTLOADER=y
  CONFIG_MCUBOOT_ENABLE_LOGGING=y

  CONFIG_SAMV7_FORMAT_MCUBOOT=y
  CONFIG_INIT_ENTRYPOINT=&quot;mcuboot_loader_main&quot;
</code></pre><p>mcuboot-slot-confirm: This configuration exercises the MCUboot compatible application slot confirm example.</p><pre><code>Generate signed binaries for MCUboot compatible application:
  ./apps/boot/mcuboot/mcuboot/scripts/imgtool.py sign \\
    --key apps/boot/mcuboot/mcuboot/root-rsa-2048.pem --align 8 \\
    --version 1.0.0 --header-size 0x200 --pad-header --slot-size 0x28000 \\
    nuttx/nuttx.bin signed_app_1_0_0.bin

Relevant configuration settings:

  CONFIG_BOARD_LATE_INITIALIZE=y

  CONFIG_EXAMPLES_MCUBOOT_SLOT_CONFIRM=y

  CONFIG_SAMV7_FORMAT_MCUBOOT=y
  CONFIG_INIT_ENTRYPOINT=&quot;mcuboot_confirm_main&quot;
</code></pre>`,151)]))}const m=t(a,[["render",r]]);export{p as __pageData,m as default};
