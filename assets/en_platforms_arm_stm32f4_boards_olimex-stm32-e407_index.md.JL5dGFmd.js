import{_ as o,c as t,al as a,o as n}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"Olimex STM32-E407","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/stm32f4/boards/olimex-stm32-e407/index.md","filePath":"en/platforms/arm/stm32f4/boards/olimex-stm32-e407/index.md"}'),i={name:"en/platforms/arm/stm32f4/boards/olimex-stm32-e407/index.md"};function s(r,e,h,d,c,l){return n(),t("div",null,e[0]||(e[0]=[a(`<h1 id="olimex-stm32-e407" tabindex="-1">Olimex STM32-E407 <a class="header-anchor" href="#olimex-stm32-e407" aria-label="Permalink to &quot;Olimex STM32-E407&quot;">​</a></h1><p>chip:stm32, chip:stm32f4, chip:stm32f407</p><p>The Olimex STM32-E407 configuration is based on the configuration olimex-stm32-h407 and stm32f4discovery.</p><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><h3 id="instantiating-configurations" tabindex="-1">Instantiating Configurations <a class="header-anchor" href="#instantiating-configurations" aria-label="Permalink to &quot;Instantiating Configurations&quot;">​</a></h3><p>Each Olimex-STM32-E407 configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh [OPTIONS] olimex-stm32-e407:&lt;subdir&gt;
</code></pre><p>Typical options include -l for a Linux host platform or -c for Cygwin host platform. See &#39;tools/configure.sh -h&#39; for other options. And &lt;subdir&gt; is one of the sub-directories listed below.</p><h3 id="compile-firmware" tabindex="-1">Compile Firmware <a class="header-anchor" href="#compile-firmware" aria-label="Permalink to &quot;Compile Firmware&quot;">​</a></h3><p>Once you&#39;ve set the proper configuration, you just need to execute the next command:</p><pre><code>make
</code></pre><p>If everything goes find, it should return the next two files:</p><pre><code>nuttx.hex
nuttx.bin
</code></pre><p>You can return more kinds of files by setting on menuconfig.</p><h3 id="flashing-the-board" tabindex="-1">Flashing the Board <a class="header-anchor" href="#flashing-the-board" aria-label="Permalink to &quot;Flashing the Board&quot;">​</a></h3><p>You can flash this board in different ways, but the easiest way is using ARM-USB-TINY-H JTAG flasher device. Connect this device to the JTAG connector and type the next command:</p><pre><code>openocd -f interface/ftdi/olimex-arm-usb-tiny-h.cfg -f target/stm32f4x.cfg -c init -c &quot;reset halt&quot; -c &quot;flash write_image erase nuttx.bin 0x08000000&quot;
</code></pre><h3 id="configuration-directories" tabindex="-1">Configuration Directories <a class="header-anchor" href="#configuration-directories" aria-label="Permalink to &quot;Configuration Directories&quot;">​</a></h3><h3 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h3><p>Configures the NuttShell (nsh) located at apps/examples/nsh. This configuration enables a console on UART2. Support for builtin applications is enabled, but in the base configuration no builtin applications are selected.</p><h3 id="usbnsh" tabindex="-1">usbnsh <a class="header-anchor" href="#usbnsh" aria-label="Permalink to &quot;usbnsh&quot;">​</a></h3><p>Configures the NuttShell (nsh) located at apps/examples/nsh. This configuration enables a console on USB_OTG1. Support for builtin applications is enabled, but in the base configuration no builtin applications are selected.</p><h3 id="netnsh" tabindex="-1">netnsh <a class="header-anchor" href="#netnsh" aria-label="Permalink to &quot;netnsh&quot;">​</a></h3><p>Configures the NuttShell (nsh) located at examples/nsh. This configuration is focused on network testing.</p><h3 id="bmp180" tabindex="-1">bmp180 <a class="header-anchor" href="#bmp180" aria-label="Permalink to &quot;bmp180&quot;">​</a></h3><p>This is a configuration example for the BMP180 barometer sensor. This sensor works with I2C, you need to do the next connections:</p><pre><code>BMP180 VIN -&gt; Board 3.3V
BMP180 GND -&gt; Board GND
BMP180 SCL -&gt; Board PB6 (Arduino header D1)
BMP180 SDA -&gt; Board PB7 (Arduino header D0)
</code></pre><p>This example is configured to work with the USBNSH instead of UART NSH, so the console will be shown over the USB_OTG1 connector.</p><p>On the console, type &quot;ls /dev &quot; and if the registration process goes fine, you should see a device called &quot;press0&quot;. Now execute the app BMP180 to see the ambient pressure value.</p><h3 id="dac" tabindex="-1">dac <a class="header-anchor" href="#dac" aria-label="Permalink to &quot;dac&quot;">​</a></h3><p>This is a configuration example to use the DAC1 of the board. The DAC1 is attached to the PA4 pin (Arduino header D10).</p><p>This example is configured to work with the USBNSH instead of UART NSH, so the console will be shown over the USB_OTG1 connector.</p><p>On the console, type &quot;ls /dev &quot; and if the registration process goes fine, you should see a device called &quot;dac0&quot;. Now execute the app dac put a value at the output.</p><h3 id="ina219" tabindex="-1">ina219 <a class="header-anchor" href="#ina219" aria-label="Permalink to &quot;ina219&quot;">​</a></h3><p>This is a configuration example for the INA219 DC current sensor. This sensor works with I2C, you need to do the next connections:</p><pre><code>INA219 VIN -&gt; Board 3.3V
INA219 GND -&gt; Board GND
INA219 SCL -&gt; Board PB6 (Arduino header D1)
INA219 SDA -&gt; Board PB7 (Arduino header D0)
</code></pre><p>This example is configured to work with the USBNSH instead of UART NSH, so the console will be shown over the USB_OTG1 connector.</p><p>On the console, type &quot;ls /dev &quot; and if the registration process goes fine, you should see a device called &quot;ina219&quot;. Now execute the app ina219 to see the ambient pressure value.</p><h3 id="timer" tabindex="-1">timer <a class="header-anchor" href="#timer" aria-label="Permalink to &quot;timer&quot;">​</a></h3><p>This configuration set the proper configuration to use the timer1 of the board. This example is configured to work with the USBNSH instead of UART NSH, so the console will be shown over the USB_OTG1 connector.</p><p>On the console, type &quot;ls /dev &quot; and if the registration process goes fine, you should see a device called &quot;timer1&quot;.</p><h3 id="mrf24j40-mac" tabindex="-1">mrf24j40-mac <a class="header-anchor" href="#mrf24j40-mac" aria-label="Permalink to &quot;mrf24j40-mac&quot;">​</a></h3><p>This configuration set the proper configuration to set the 802.15.4 communication layer with the MRF24J40 radio. This radio works with SPI, you need to do the next connections:</p><pre><code>MRF24J40 VCC  -&gt; Board 3.3V
MRF24J40 GND  -&gt; Board GND
MRF24J40 SCLK -&gt; Board PA5 (Arduino header D13)
MRF24J40 MISO -&gt; Board PA6 (Arduino header D12)
MRF24J40 MOSI -&gt; Board PB5 (Arduino header D11)
MRF24J40 CS   -&gt; Board PA4 (Arduino header D10)
MRF24J40 INT  -&gt; Board PG12 (Arduino header D8)
</code></pre><p>This example is configured to work with the USBNSH instead of UART NSH, so the console will be shown over the USB_OTG1 connector.</p><p>Once you&#39;re on the console, you need to check if the initialization process was fine. To do so, you need to type &quot;ls /dev&quot; and you should see a device call &quot;ieee0&quot;. At this point we need to set-up the network, follow the next steps:</p><pre><code>This is an example of how to configure a coordinator:
i8sak /dev/ieee0 startpan cd:ab
i8sak set chan 11
i8sak set saddr 42:01
i8sak acceptassoc

This is an example of how to configure the endpoint:
i8sak /dev/ieee0
i8sak set chan 11
i8sak set panid cd:ab
i8sak set saddr 42:02
i8sak set ep_saddr 42:01
i8sak assoc
</code></pre><h3 id="mrf24j40-6lowpan" tabindex="-1">mrf24j40-6lowpan <a class="header-anchor" href="#mrf24j40-6lowpan" aria-label="Permalink to &quot;mrf24j40-6lowpan&quot;">​</a></h3><p>This configuration set the proper configuration to use 6lowpan protocol with the MRF24J40 radio. This radio works with SPI, you need to do the next connections:</p><pre><code>MRF24J40 VCC  -&gt; Board 3.3V
MRF24J40 GND  -&gt; Board GND
MRF24J40 SCLK -&gt; Board PA5 (Arduino header D13)
MRF24J40 MISO -&gt; Board PA6 (Arduino header D12)
MRF24J40 MOSI -&gt; Board PB5 (Arduino header D11)
MRF24J40 CS   -&gt; Board PA4 (Arduino header D10)
MRF24J40 INT  -&gt; Board PG12 (Arduino header D8)
</code></pre><p>This example is configured to work with the USBNSH instead of UART NSH, so the console will be shown over the USB_OTG1 connector.</p><p>Once you&#39;re on the console, you need to check if the initialization process was fine. To do so, you need to type &quot;ls /dev&quot; and you should see a device call &quot;ieee0&quot;. At this point we need to set-up the network, follow the next steps:</p><pre><code>This is an example of how to configure a coordinator:
i8sak wpan0 startpan cd:ab
i8sak set chan 11
i8sak set saddr 42:01
i8sak acceptassoc

When the association was complete, you need to bring-up the network:
ifup wpan0

This is an example of how to configure the endpoint:
i8sak wpan0
i8sak set chan 11
i8sak set panid cd:ab
i8sak set saddr 42:02
i8sak set ep_saddr 42:01
i8sak assoc

When the association was complete, you need to bring-up the network:
ifup wpan0
</code></pre><p>If you execute the command &quot;ifconfig&quot;, you will be able to see the info of the WPAN0 interface and see the assigned IP. This interface can be use with an UDP or TCP server/client application.</p>`,54)]))}const f=o(i,[["render",s]]);export{p as __pageData,f as default};
