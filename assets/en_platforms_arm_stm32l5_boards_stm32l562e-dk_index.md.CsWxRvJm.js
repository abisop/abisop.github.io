import{_ as t,c as a,al as n,o}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"ST STM32L562E-DK","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/stm32l5/boards/stm32l562e-dk/index.md","filePath":"en/platforms/arm/stm32l5/boards/stm32l562e-dk/index.md"}'),i={name:"en/platforms/arm/stm32l5/boards/stm32l562e-dk/index.md"};function r(s,e,l,u,c,h){return o(),a("div",null,e[0]||(e[0]=[n(`<h1 id="st-stm32l562e-dk" tabindex="-1">ST STM32L562E-DK <a class="header-anchor" href="#st-stm32l562e-dk" aria-label="Permalink to &quot;ST STM32L562E-DK&quot;">​</a></h1><p>chip:stm32, chip:stm32l5, chip:stm32l562</p><p>This page discusses the port of NuttX to the STMicro STM32L562E-DK board. That board features the STM32L562QEI6QU MCU with 512KiB of FLASH and 256KiB of SRAM.</p><p>This port is a proof-of-concept to demonstrate running NuttX in the Non-Secure TrustZone domain as a companion to TrustedFirmware-M (TFM). Running NuttX on the STM32L562E-DK without TFM is currently not supported.</p><h2 id="status" tabindex="-1">Status <a class="header-anchor" href="#status" aria-label="Permalink to &quot;Status&quot;">​</a></h2><p>2021-03-03: The board now boots and the basic NSH configuration works</p><p>: without problem.</p><h2 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h2><p>The Board provides a 2 user LEDs, LD9 and LD10 LED9 (Red) PD_3 LED10 (Green) PG_12</p><ul><li>When the I/O is LOW value, the LEDs are on.</li><li>When the I/O is HIGH value, the LEDs are off.</li></ul><p>These LEDs are not used by the board port unless CONFIG_ARCH_LEDS is defined. In that case, the usage by the board port is defined in include/board.h and src/stm32_autoleds.c. The LEDs are used to encode OS related events as follows when the LEDs are available:</p><blockquote><p>SYMBOL Meaning RED GREEN Note</p><hr><p>LED_STARTED LED_HEAPALLOCATE LED_IRQSENABLED LED_STACKCREATED NuttX has been started Heap has been allocated Interrupts enabled Idle stack created OFF ON ON OFF OFF OFF ON ON<br> LED_INIRQ In an interrupt GLOW NC momentary LED_SIGNAL In a signal handler GLOW NC momentary LED_ASSERTION An assertion failed GLOW NC momentary LED_PANIC LED_IDLE The system has crashed MCU is is sleep mode ON NC OFF ON flashing 2Hz</p><p>OFF - means that the OS is still initializing. Initialization is very fast</p><p>: so if you see this at all, it probably means that the system is hanging up somewhere in the initialization phases.</p><p>GREEN - This means that the OS completed initialization.</p><p>Flashing RED - In the event of a fatal crash, all other LEDs will be</p><p>: extinguished and RED LED will FLASH at a 2Hz rate.</p></blockquote><p>Thus if the GREEN LED is lit, NuttX has successfully booted and is, apparently, idleing normally. If the RED LED is flashing at approximately 2Hz, then a fatal error has been detected and the system has halted.</p><h2 id="buttons" tabindex="-1">Buttons <a class="header-anchor" href="#buttons" aria-label="Permalink to &quot;Buttons&quot;">​</a></h2><p>B1 USER: the user button is connected to the I/O PC13 (pin 2) of the STM32 microcontroller.</p><h2 id="serial-consoles" tabindex="-1">Serial Consoles <a class="header-anchor" href="#serial-consoles" aria-label="Permalink to &quot;Serial Consoles&quot;">​</a></h2><h3 id="usart1-virtual-com-port" tabindex="-1">USART1 - Virtual COM Port <a class="header-anchor" href="#usart1-virtual-com-port" aria-label="Permalink to &quot;USART1 - Virtual COM Port&quot;">​</a></h3><p>Default board is configured to use USART1 as console, which is wired to the STLINK Virtual COM Port.</p><blockquote><p>FUNC GPIO</p><hr><p>TXD: PA9 RXD: PA10</p></blockquote><p>Use make menuconfig to configure USART1 as the console:</p><pre><code>CONFIG_STM32L5_USART1=y
CONFIG_USART1_SERIALDRIVER=y
CONFIG_USART1_SERIAL_CONSOLE=y
CONFIG_USART1_RXBUFSIZE=256
CONFIG_USART1_TXBUFSIZE=256
CONFIG_USART1_BAUD=115200
CONFIG_USART1_BITS=8
CONFIG_USART1_PARITY=0
CONFIG_USART1_2STOP=0
</code></pre><h3 id="default" tabindex="-1">Default <a class="header-anchor" href="#default" aria-label="Permalink to &quot;Default&quot;">​</a></h3><p>As shipped, the virtual COM port is enabled.</p><h2 id="trustedfirmware-m" tabindex="-1">TrustedFirmware-M <a class="header-anchor" href="#trustedfirmware-m" aria-label="Permalink to &quot;TrustedFirmware-M&quot;">​</a></h2><p>You should study [UM2671] STMicroelectronics. UM2671: Getting started with STM32CubeL5 TFM application, 3rd edition, June 2021.</p><p>I was using STM32CubeL5 v1.5.0</p><p>: (<a href="https://github.com/STMicroelectronics/STM32CubeL5/tree/v1.5.0" target="_blank" rel="noreferrer">https://github.com/STMicroelectronics/STM32CubeL5/tree/v1.5.0</a>).</p><h3 id="changes-required-to-stm32cubel5-s-tfm" tabindex="-1">Changes required to STM32CubeL5&#39;s TFM <a class="header-anchor" href="#changes-required-to-stm32cubel5-s-tfm" aria-label="Permalink to &quot;Changes required to STM32CubeL5\\&#39;s TFM&quot;">​</a></h3><p>The following three changes to TFM have to be applied to be able to run NuttX.</p><p>The first one is required since NuttX issues SVC instructions while interrupts are disabled, which causes HardFaults. NuttX then detects this situation in the HardFault handler. Per default HardFaults are taken to the secure domain, though. Thus, this change:</p><pre><code>--- a/Projects/STM32L562E-DK/Applications/TFM/TFM_SBSFU_Boot/Src/boot_hal.c
+++ b/Projects/STM32L562E-DK/Applications/TFM/TFM_SBSFU_Boot/Src/boot_hal.c
@@ -306,6 +306,9 @@ void jumper(struct arm_vector_table *vector)
   /* set the secure vector */
   SCB-&gt;VTOR = (uint32_t)vector;

+  /* Stay in Non-Secure mode for BusFault, HardFault, and NMI exceptions */
+  SCB-&gt;AIRCR = (SCB-&gt;AIRCR &amp; 0x0000FFFF) | 0x05FA0000 | SCB_AIRCR_BFHFNMINS_Msk;
+
   vt = (struct arm_vector_table *)vector;

The second change is required to ensure all interrupts are taken to the
non-secure domain:

--- a/Projects/STM32L562E-DK/Applications/TFM/TFM_Appli/Secure/Src/spm_hal.c
+++ b/Projects/STM32L562E-DK/Applications/TFM/TFM_Appli/Secure/Src/spm_hal.c
@@ -535,6 +535,7 @@ enum tfm_plat_err_t tfm_spm_hal_system_reset_cfg(void)
 enum tfm_plat_err_t tfm_spm_hal_nvic_interrupt_target_state_cfg(void)
 {
   /*    return nvic_interrupt_target_state_cfg();*/
+  nvic_interrupt_target_state_cfg();
   return TFM_PLAT_ERR_SUCCESS;
 }
</code></pre><p>The third change is required, since current NuttX does not support lazy FPU register stacking any longer. Thus, this must be disabled for the TF-M secure code as well:</p><pre><code>--- a/Projects/STM32L562E-DK/Applications/TFM/TFM_Appli/Secure/Src/target_cfg.c
+++ b/Projects/STM32L562E-DK/Applications/TFM/TFM_Appli/Secure/Src/target_cfg.c
@@ -134,7 +134,7 @@ void sau_and_idau_cfg(void)
   SCB-&gt;NSACR = (SCB-&gt;NSACR &amp; ~(SCB_NSACR_CP10_Msk | SCB_NSACR_CP11_Msk)) |
                ((SCB_NSACR_CP10_11_VAL &lt;&lt; SCB_NSACR_CP10_Pos) &amp; (SCB_NSACR_CP10_Msk | SCB_NSACR_CP11_Msk));

-  FPU-&gt;FPCCR = (FPU-&gt;FPCCR &amp; ~(FPU_FPCCR_TS_Msk | FPU_FPCCR_CLRONRETS_Msk | FPU_FPCCR_CLRONRET_Msk)) |
+  FPU-&gt;FPCCR = (FPU-&gt;FPCCR &amp; ~(FPU_FPCCR_TS_Msk | FPU_FPCCR_CLRONRETS_Msk | FPU_FPCCR_CLRONRET_Msk | FPU_FPCCR_LSPEN_Msk)) |
                ((FPU_FPCCR_TS_VAL        &lt;&lt; FPU_FPCCR_TS_Pos) &amp; FPU_FPCCR_TS_Msk) |
                ((FPU_FPCCR_CLRONRETS_VAL &lt;&lt; FPU_FPCCR_CLRONRETS_Pos) &amp; FPU_FPCCR_CLRONRETS_Msk) |
                ((FPU_FPCCR_CLRONRET_VAL  &lt;&lt; FPU_FPCCR_CLRONRET_Pos) &amp; FPU_FPCCR_CLRONRET_Msk);
</code></pre><h3 id="encrypting-and-signing-the-nuttx-binary" tabindex="-1">Encrypting and Signing the NuttX Binary <a class="header-anchor" href="#encrypting-and-signing-the-nuttx-binary" aria-label="Permalink to &quot;Encrypting and Signing the NuttX Binary&quot;">​</a></h3><p>According to Figure 24 of [UM2671] and since we use the &#39;external flash configuration&#39;, we must create the &#39;tfm_ns_enc_sign.bin&#39; image from &#39;nuttx.bin&#39;. This is done with mcuboot&#39;s imgtool.py.:</p><pre><code>imgtool.py sign               \\
      -k root-rsa-2048_1.pem  \\  Key used for signing
      -E enc-rsa2048-pub.pem  \\  Encrypt image using the provided public key
      -o 0x90000400           \\  OTFDEC
      -e little               \\  Little Endian
      -S 0x100000             \\  Size of Flash Slot
      -H 0x400                \\  Header Size
      --pad-header            \\  Pad header with zeroes
      -v version             \\  Version (TEXT)
      -s auto                 \\  Security Counter - auto: Create from Version
      --align 8               \\  8 byte alignment
      nuttx.bin               \\  input file
      tfm_ns_enc_sign.bin        output file
</code></pre><p>On my system the full command is as follows:</p><pre><code> python3 ~/compile/STM32CubeL5/Middlewares/Third_Party/mcuboot/scripts/imgtool.py sign -k ~/compile/STM32CubeL5/Middlewares/Third_Party/trustedfirmware/bl2/ext/mcuboot/root-rsa-2048_1.pem -E ~/compile/STM32CubeL5/Middlewares/Third_Party/trustedfirmware/bl2/ext/mcuboot/enc-rsa2048-pub.pem -o 0x90000400 -e little -S 0x100000 -H 0x400 --pad-header -v 1 -s auto --align 8 nuttx.bin tfm_ns_enc_sign.bin
</code></pre><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><h3 id="information-common-to-all-configurations" tabindex="-1">Information Common to All Configurations <a class="header-anchor" href="#information-common-to-all-configurations" aria-label="Permalink to &quot;Information Common to All Configurations&quot;">​</a></h3><p>Each configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh nucleo-l552ze:&lt;subdir&gt;
</code></pre><p>Before building, make sure the PATH environment variable includes the correct path to the directory than holds your toolchain binaries.</p><p>And then build NuttX by simply typing the following. At the conclusion of the make, the nuttx binary will reside in an ELF file called, simply, nuttx:</p><pre><code>make oldconfig
make
</code></pre><p>The &lt;subdir&gt; that is provided above as an argument to the tools/configure.sh must be is one of the following.</p><p>NOTES:</p><ol><li><p>These configurations use the mconf-based configuration tool. To change any of these configurations using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository. b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></li><li><p>Unless stated otherwise, all configurations generate console output on USART1, as described above under &quot;Serial Console&quot;. The elevant configuration settings are listed below:</p><pre><code>CONFIG_STM32L5_USART1=y
CONFIG_STM32L5_USART1_SERIALDRIVER=y
CONFIG_STM32L5_USART=y

CONFIG_USART1_SERIALDRIVER=y
CONFIG_USART1_SERIAL_CONSOLE=y

CONFIG_USART1_RXBUFSIZE=256
CONFIG_USART1_TXBUFSIZE=256
CONFIG_USART1_BAUD=115200
CONFIG_USART1_BITS=8
CONFIG_USART1_PARITY=0
CONFIG_USART1_2STOP=0
</code></pre></li><li><p>All of these configurations are set up to build under Linux using the &quot;GNU Tools for ARM Embedded Processors&quot; that is maintained by ARM (unless stated otherwise in the description of the configuration).</p><blockquote><p><a href="https://developer.arm.com/open-source/gnu-toolchain/gnu-rm" target="_blank" rel="noreferrer">https://developer.arm.com/open-source/gnu-toolchain/gnu-rm</a></p></blockquote><p>That toolchain selection can easily be reconfigured using &#39;make menuconfig&#39;. Here are the relevant current settings:</p></li></ol><p>Build Setup::</p><p>: CONFIG_HOST_LINUX=y : Linux environment</p><p>System Type -&gt; Toolchain::</p><p>: CONFIG_ARM_TOOLCHAIN_GNU_EABI=y : GNU ARM EABI toolchain</p><h2 id="configuration-sub-directories" tabindex="-1">Configuration sub-directories <a class="header-anchor" href="#configuration-sub-directories" aria-label="Permalink to &quot;Configuration sub-directories&quot;">​</a></h2><h3 id="nsh" tabindex="-1">nsh: <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh:&quot;">​</a></h3><p>Configures the NuttShell (nsh) located at examples/nsh. This configuration is focused on low level, command-line driver testing.</p>`,55)]))}const _=t(i,[["render",r]]);export{p as __pageData,_ as default};
