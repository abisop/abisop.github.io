import{_ as t,c as o,al as n,o as i}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"Olimex STM32-P207","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/stm32f4/boards/olimex-stm32-p407/index.md","filePath":"en/platforms/arm/stm32f4/boards/olimex-stm32-p407/index.md"}'),a={name:"en/platforms/arm/stm32f4/boards/olimex-stm32-p407/index.md"};function r(s,e,l,d,h,u){return i(),o("div",null,e[0]||(e[0]=[n(`<h1 id="olimex-stm32-p207" tabindex="-1">Olimex STM32-P207 <a class="header-anchor" href="#olimex-stm32-p207" aria-label="Permalink to &quot;Olimex STM32-P207&quot;">​</a></h1><p>chip:stm32, chip:stm32f4, chip:stm32f407</p><p>The NuttX configuration for the Olimex STM32-P407 is derives more or less directly from the Olimex STM32-P207 board support. The P207 and P407 seem to share the same board design. Other code comes from the STM3240G board support (which has the same crystal and clocking) and from the STM32 F4 Discovery (which has the same STM32 part)</p><h2 id="board-support" tabindex="-1">Board Support <a class="header-anchor" href="#board-support" aria-label="Permalink to &quot;Board Support&quot;">​</a></h2><p>The following peripherals are available in this configuration.</p><ul><li>LEDs: Show the system status</li><li>Buttons: TAMPER-button, WKUP-button, J1-Joystick (consists of RIGHT-, UP-, LEFT-, DOWN-, and CENTER-button).</li><li>ADC: ADC1 samples the red trim potentiometer AN_TR Built in app &#39;adc&#39; works.</li><li>USB-FS-OTG: There is a USB-A-connector (host) connected to the full speed STM32 OTG inputs.</li><li>USB-HS-OTG: The other connector (device) is connected to the high speed STM32 OTG inputs.</li><li>CAN: Built in app &#39;can&#39; works, but apart from that not really tested.</li><li>Ethernet: Ping to other station on the network works.</li><li>microSD: Not fully functional. See below.</li><li>LCD: Nokia 6610. This is similar the Nokia 6100 LCD used on other Olimex boards. There is a driver for that LCD at Obsoleted/nuttx/drivers/lcd/nokia6100.c, however, it was removed because it was not properly integrated. It uses a 9-bit SPI interface which is difficult to get working properly.</li><li>External SRAM: Support is included for the onboard SRAM. It uses SRAM settings from another board that might need to be tweaked. Difficult to test because the SRAM conflicts with both RS232 ports.</li><li>Other: Buzzer, Camera, Temperature sensor, audio have not been tested.</li></ul><blockquote><p>If so, then it requires a 9-bit</p></blockquote><h2 id="microsd-card-interface" tabindex="-1">microSD Card Interface <a class="header-anchor" href="#microsd-card-interface" aria-label="Permalink to &quot;microSD Card Interface&quot;">​</a></h2><h3 id="microsd-connector" tabindex="-1">microSD Connector <a class="header-anchor" href="#microsd-connector" aria-label="Permalink to &quot;microSD Connector&quot;">​</a></h3><pre><code>----------------- ----------------- ------------------------
SD/MMC CONNECTOR        BOARD        GPIO CONFIGURATION(s
PIN SIGNAL             SIGNAL          (no remapping)
--- ------------- ----------------- -------------------------
1   DAT2/RES      SD_D2/USART3_TX/  PC10 GPIO_SDIO_D2
                  SPI3_SCK
2   CD/DAT3/CS    SD_D3/USART3_RX/  PC11 GPIO_SDIO_D3
                  SPI3_MISO
3   CMD/DI        SD_CMD            PD2  GPIO_SDIO_CMD
4   VDD           N/A               N/A
5   CLK/SCLK      SD_CLK/SPI3_MOSI  PC12 GPIO_SDIO_CK
6   VSS           N/A               N/A
7   DAT0/D0       SD_D0/DCMI_D2     PC8  GPIO_SDIO_D0
8   DAT1/RES      SD_D1/DCMI_D3     PC9  GPIO_SDIO_D1
--- ------------- ----------------- -------------------------

NOTES:
1. DAT4, DAT4, DAT6, and DAT7 not connected.
2. There are no alternative pin selections.
3. There is no card detect (CD) GPIO input so we will not
   sense if there is a card in the SD slot or not.  This will
   make usage very awkward.
</code></pre><h3 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;Configuration&quot;">​</a></h3><p>Enabling SDIO-based MMC/SD support:</p><p>System Type-&gt;STM32 Peripheral Support:</p><pre><code>CONFIG_STM32_SDIO=y                      : Enable SDIO support
CONFIG_STM32_DMA2=y                      : DMA2 is needed by the driver
</code></pre><p>Device Drivers -&gt; MMC/SD Driver Support:</p><pre><code>CONFIG_MMCSD=y                           : Enable MMC/SD support
CONFIG_MMSCD_NSLOTS=1                    : One slot per driver instance
# CONFIG_MMCSD_HAVE_CARDDETECT is not set : No card-detect GPIO
# CONFIG_MMCSD_MMCSUPPORT is not set     : Interferes with some SD cards
# CONFIG_MMCSD_SPI is not set            : No SPI-based MMC/SD support
CONFIG_MMCSD_SDIO=y                      : SDIO-based MMC/SD support
CONFIG_MMCSD_MULTIBLOCK_LIMIT=1          : Disable to keep things simple
CONFIG_SDIO_DMA=y                        : Use SDIO DMA
# CONFIG_SDIO_BLOCKSETUP is not set      : (not implemented)
</code></pre><p>Library Routines:</p><pre><code>CONFIG_SCHED_WORKQUEUE=y                 : Driver needs work queue support
</code></pre><p>Application Configuration -&gt; NSH Library:</p><pre><code>CONFIG_NSH_ARCHINIT=y                    : NSH board-initialization
</code></pre><h3 id="using-the-sd-card" tabindex="-1">Using the SD card <a class="header-anchor" href="#using-the-sd-card" aria-label="Permalink to &quot;Using the SD card&quot;">​</a></h3><ol><li><p>Since there is no CD GPIO pin, the firmware sill not know if there is a card in the SD slot or not. It will assume that there is and attempt to mount the SD card on power-up. If there is no SD card in the card slot, there will be a long delay during initialization as the firmware attempts to query the non-existent card, timeout, and retry.</p></li><li><p>After booting, an SDIO device will appear as /dev/mmcsd0</p></li><li><p>If you try mounting an SD card with nothing in the slot, the mount will fail:</p><pre><code>nsh&gt; mount -t vfat /dev/mmcsd0 /mnt/sdcard
nsh: mount: mount failed: 19
</code></pre></li></ol><h3 id="status" tabindex="-1">STATUS: <a class="header-anchor" href="#status" aria-label="Permalink to &quot;STATUS:&quot;">​</a></h3><p>2017-01-28: There is no card communication. All commands to the SD card timeout.</p><h2 id="otgfs-host" tabindex="-1">OTGFS Host <a class="header-anchor" href="#otgfs-host" aria-label="Permalink to &quot;OTGFS Host&quot;">​</a></h2><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><h3 id="information-common-to-all-configurations" tabindex="-1">Information Common to All Configurations <a class="header-anchor" href="#information-common-to-all-configurations" aria-label="Permalink to &quot;Information Common to All Configurations&quot;">​</a></h3><p>Each Olimex STM32-P407 configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh olimex-stm32-p407:&lt;subdir&gt;
</code></pre><p>Where &lt;subdir&gt; is one of the configuration sub-directories listed in the following section.</p><p>Before building, make sure the PATH environment variable includes the correct path to the directory than holds your toolchain binaries.</p><p>And then build NuttX by simply typing the following. At the conclusion of the make, the nuttx binary will reside in an ELF file called, simply, nuttx.:</p><pre><code>make oldconfig
make
</code></pre><p>NOTES:</p><ol><li><p>This configuration uses the mconf-based configuration tool. To change this configurations using that tool, you should:</p><blockquote><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository. b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></blockquote></li><li><p>Serial Output</p><blockquote><p>This configuraiont produces all of its test output on the serial console. This configuration has USART3 enabled as a serial console. This is the connector labeled RS232_2. This can easily be changed by reconfiguring with &#39;make menuconfig&#39;.</p></blockquote></li><li><p>Toolchain</p><blockquote><p>By default, the host platform is set to be Linux using the NuttX buildroot toolchain. The host and/or toolchain selection can easily be changed with &#39;make menuconfig&#39;.</p></blockquote></li><li></li></ol><pre><code>Note that CONFIG\\_STM32\\_DISABLE\\_IDLE\\_SLEEP\\_DURING\\_DEBUG is enabled so

:   that the JTAG connection is not disconnected by the idle loop.
</code></pre><h3 id="configuration-sub-directories" tabindex="-1">Configuration sub-directories <a class="header-anchor" href="#configuration-sub-directories" aria-label="Permalink to &quot;Configuration sub-directories&quot;">​</a></h3><p>The &lt;subdir&gt; that is provided above as an argument to the tools/configure.sh must be is one of the following.</p><h3 id="dhtxx" tabindex="-1">dhtxx <a class="header-anchor" href="#dhtxx" aria-label="Permalink to &quot;dhtxx&quot;">​</a></h3><p>Configuration added by Abdelatif Guettouche for testing the the DHTxx sensor. This configuration expects this setup:</p><pre><code>DHTXX_PIN_OUTPUT   PG9
DHTXX_PIN_INPUT    PG9
</code></pre><p>The STM32 free-running timer is also required.</p><h3 id="hidkbd" tabindex="-1">hidkbd <a class="header-anchor" href="#hidkbd" aria-label="Permalink to &quot;hidkbd&quot;">​</a></h3><p>This is another NSH configuration that supports a USB HID Keyboard device and the HID keyboard example at apps/examples/hidkbd.</p><p>STATUS: 2018-10-07: Not all keyboards will connect successfully. I have not looked into the details but it may be that those keyboards are not compatible with the driver (which only accepts &quot;boot&quot; keyboards). Also, when typing input into the HID keyboard, characters are often missing and sometimes duplicated. This is like some issue with the read logic of drivers/usbhost_hidkbc.c.</p><h3 id="kelf" tabindex="-1">kelf <a class="header-anchor" href="#kelf" aria-label="Permalink to &quot;kelf&quot;">​</a></h3><p>This is a protected mode version of the apps/examples/elf test of loadable ELF programs. This version is unique because the ELF programs are loaded into user space.</p><p>NOTES:</p><ol><li></li></ol><pre><code>See build recommendations and instructions for combining the .hex

:   files under the section entitled \\&quot;Protected Mode Build\\&quot; above.
</code></pre><ol start="2"><li></li></ol><pre><code>Unlike other versions of apps/examples/elf configurations, the test

:   ELF programs are not provided internally on a ROMFS or CROMFS
    file system. This is due to the fact that those file systems are
    built in user space and there is no mechanism in the build
    system to easily get them into the kernel space.

    Instead, the programs must be copied to a USB FLASH drive from
    your host PC. The programs can be found at
    apps/examples/elf/tests/romfs. All of those files should be
    copied to the USB FLASH drive. The apps/example/elf will wait on
    power up until the USB FLASH drive has been inserted and
    initialized.
</code></pre><h3 id="kmodule" tabindex="-1">kmodule <a class="header-anchor" href="#kmodule" aria-label="Permalink to &quot;kmodule&quot;">​</a></h3><p>This is a protected mode version of the apps/examples/module test of loadable ELF kernel modules. This version is unique because the ELF programs are loaded into the protected kernel space.</p><p>NOTES:</p><ol><li></li></ol><pre><code>See build recommendations and instructions for combining the .hex

:   files under the section entitled \\&quot;Protected Mode Build\\&quot; above.
</code></pre><ol start="2"><li></li></ol><pre><code>Unlike other versions of apps/examples/module configurations, the test

:   ELF modules are not provided internally on a ROMFS or CROMFS
    file system. This is due to the fact that those file systems are
    built in user space and there is no mechanism in the build
    system to easily get them into the kernel space.

    Instead, the module(s) must be copied to a USB FLASH drive from
    your host PC. The module(s) can be found at
    apps/examples/module/driver/fsroot. All of those file(s) should
    be copied to the USB FLASH drive. Like the kelf configuration,
    the logic in apps/example/module will wait on power up until the
    USB FLASH drive has been inserted and initialized.

    STATUS: 2018-08-07: After some struggle, the configuration
    appears to be working correctly.
</code></pre><h3 id="knsh" tabindex="-1">knsh <a class="header-anchor" href="#knsh" aria-label="Permalink to &quot;knsh&quot;">​</a></h3><p>This is identical to the nsh configuration below except that NuttX is built as a PROTECTED mode, monolithic module and the user applications are built separately.</p><p>NOTES:</p><ol><li>See build recommendations and instructions for combining the .hex files under the section entitled &quot;Protected Mode Build&quot; above.</li></ol><h3 id="module" tabindex="-1">module <a class="header-anchor" href="#module" aria-label="Permalink to &quot;module&quot;">​</a></h3><p>A simple stripped down NSH configuration that was used for testing NuttX OS modules using the test at apps/examples/module. Key difference from the nsh configuration include these additions to the configuration file:</p><pre><code>CONFIG_BOARDCTL_OS_SYMTAB=y
CONFIG_EXAMPLES_MODULE=y
CONFIG_EXAMPLES_MODULE_BUILTINFS=y
CONFIG_EXAMPLES_MODULE_DEVMINOR=0
CONFIG_EXAMPLES_MODULE_DEVPATH=&quot;/dev/ram0&quot;
CONFIG_FS_ROMFS=y
CONFIG_LIBC_ARCH_ELF=y
CONFIG_MODULE=y
CONFIG_LIBC_ELF=y
CONFIG_LIBC_ELF_MAXDEPEND=2
CONFIG_LIBC_ELF_ALIGN_LOG2=2
CONFIG_LIBC_ELF_BUFFERSIZE=128
CONFIG_LIBC_ELF_BUFFERINCR=32
</code></pre><p>The could be followed may be added for testing shared libraries in the FLAT build using apps/examples/sotest (assuming that you also have SD card support enabled and that the SD card is mount at /mnt/sdcard):</p><pre><code>CONFIG_LIBC_DLFCN=y
CONFIG_EXAMPLES_SOTEST=y
CONFIG_EXAMPLES_SOTEST_BINDIR=&quot;/mnt/sdcard&quot;
</code></pre><p>NOTE: You must always have:</p><pre><code>CONFIG_STM32_CCMEXCLUDE=y
</code></pre><p>because code cannot be executed from CCM memory.</p><p>STATUS: 2018-06-01: Configuration added. Works perfectly.</p><h3 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h3><p>This is the NuttShell (NSH) using the NSH startup logic at apps/examples/nsh</p><p>NOTES:</p><ol><li><p>USB host support for USB FLASH sticks is enabled. See the notes above under &quot;OTGFS Host&quot;.</p><p>STATUS: I have seen this work with some FLASH sticks but not with others. I have not studied the failure case carefully. They seem to fail because the request is NAKed. That is not a failure, however, that is normal behavior when the FLASH is not ready.</p><p>There have been other cases like this with the STM32 host drivers: in the event of NAKs, other drivers retry and wait for the data. The STM32 does not but returns the NAK failure immediately. My guess is that there needs to be be some retry logic to the driver 100% reliable.</p></li><li><p>Kernel Modules / Shared Libraries</p><p>I used this configuration for testing NuttX kernel modules in the FLAT build with the following configuration additions to the configuration file:</p><pre><code>CONFIG_BOARDCTL_OS_SYMTAB=y
CONFIG_EXAMPLES_MODULE=y
CONFIG_EXAMPLES_MODULE_BUILTINFS=y
CONFIG_EXAMPLES_MODULE_DEVMINOR=0
CONFIG_EXAMPLES_MODULE_DEVPATH=&quot;/dev/ram0&quot;
CONFIG_FS_ROMFS=y
CONFIG_LIBC_ARCH_ELF=y
CONFIG_MODULE=y
CONFIG_LIBC_ELF=y
CONFIG_LIBC_ELF_ALIGN_LOG2=2
CONFIG_LIBC_ELF_BUFFERINCR=32
CONFIG_LIBC_ELF_BUFFERSIZE=128

Add the following for testing shared libraries in the FLAT
build::

CONFIG_LIBC_DLFCN=y
CONFIG_EXAMPLES_SOTEST=y
CONFIG_EXAMPLES_SOTEST_BUILTINFS=y
CONFIG_EXAMPLES_SOTEST_DEVMINOR=1
CONFIG_EXAMPLES_SOTEST_DEVPATH=&quot;/dev/ram1&quot;
</code></pre></li></ol><h3 id="zmodem" tabindex="-1">zmodem <a class="header-anchor" href="#zmodem" aria-label="Permalink to &quot;zmodem&quot;">​</a></h3><p>This configuration was used to test the zmodem utilities at apps/system/zmodem. Two serial ports are used in this configuration:</p><ol><li>USART6 (RS232_1) is the serial console (because it does not support hardware flow control). It is configured 115200 8N1.</li><li>USART3 (RS232_2) is the zmodem port and does require that hardware flow control be enabled for use. It is configured 9600 8N1.</li></ol><p>On the target these will correspond to /dev/ttyS0 and /dev/ttyS1, respectively.</p><p>It is possible to configure a system without hardware flow control and using the same USART for both the serial console and for zmodem. However, you would have to take extreme care with buffering and data throughput considerations to assure that there is no Rx data overrun.</p><p>General usage instructions:</p><ol><li><p>Common Setup:</p><pre><code>[on target]
nsh&gt; mount -t vfat /dev/sda /mnt

[on Linux host]
 sudo stty -F /dev/ttyS0 9600
 sudo stty -F /dev/ttyS0 crtscts *
 sudo stty -F /dev/ttyS0 raw
 sudo stty -F /dev/ttyS0

* Because hardware flow control will be enabled on the target side
  in this configuration.
</code></pre></li><li><p>Host-to-Target File Transfer:</p><pre><code>[on target]
nsh&gt; rz

[on host]
 sudo sz &lt;filename&gt; [-l nnnn] &lt;/dev/ttyS0 &gt;/dev/ttyS0

Where &lt;filename&gt; is the file that you want to transfer. If -l nnnn is
not specified, then there will likely be packet buffer overflow errors.
nnnn should be set to a strictly less than CONFIG_SYSTEM_ZMODEM_PKTBUFSIZE.
All testing was performed with -l 512.

If you are using the NuttX implementation of rz and sz on the Linux host,
then the last command simplifies to just::

[on host]
 cp README.txt /tmp/.
 sudo ./sz -d /dev/ttyS1 README.txt

Assuming that /dev/ttyS0 is the serial and /dev/ttyS1 is the zmodem port
on the Linux host as well.  NOTE:  By default, files will be transferred
to and from the /tmp directory only.

Refer to the README file at apps/examples/zmodem for detailed information
about building rz/sz for the host and about zmodem usage in general.
</code></pre></li><li><p>Target-to-Host File Transfer:</p><pre><code>[on host]
 rz &lt;/dev/ttyS0 &gt;/dev/ttyS0
</code></pre><p>The transferred file will end up in the current directory.</p><p>If you are using the NuttX implementation of rz and sz on the Linux host, then the last command simplifies to just:</p><pre><code>[on host]
 ./rz
</code></pre><p>The transferred file will lie in the /tmp directory.</p><p>Then on the target side:</p><pre><code>[on target]
nsh sz &lt;filename&gt;
</code></pre><p>Where &lt;filename&gt; is the file that you want to transfer.</p></li></ol><h2 id="status-1" tabindex="-1">STATUS <a class="header-anchor" href="#status-1" aria-label="Permalink to &quot;STATUS&quot;">​</a></h2><p>2016-12-21: This board configuration was ported from the Olimex STM32 P207 port. Note that none of the above features have been verified. USB, CAN, ADC, and Ethernet are disabled in the base NSH configuration until they can be verified. These features should be functional but may required some tweaks due to the different clock configurations. The Olimex STM32 P207 nsh/defconfig would be a good starting place for restoring these feature configurations.</p><p>CCM memory is not included in the heap (CONFIG_STM32_CCMEXCLUDE=y) because it does not support DMA, leaving only 128KiB for program usage.</p><p>2017-01-23: Added the knsh configuration and support for the PROTECTED build mode.</p><p>2018-05-27: Added the zmodem configuration. Verified correct operation with host-to-target transfers (using Linux sz command). There appears to be a problem using the NuttX sz command running on the host???</p><p>2018-05-28: Verified correct operation with target-to-host transfers (using Linux rz command). There appears to be a problem using the NuttX rz command running on the host???</p><p>2018-06-01: Added the module configuration. Works perfectly.</p>`,90)]))}const m=t(a,[["render",r]]);export{p as __pageData,m as default};
