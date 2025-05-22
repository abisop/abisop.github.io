import{_ as o,c as n,al as t,o as s}from"./chunks/framework.NFAqBSgQ.js";const m=JSON.parse('{"title":"Run NuttX on Renode","description":"","frontmatter":{},"headers":[],"relativePath":"en/guides/renode.md","filePath":"en/guides/renode.md"}'),r={name:"en/guides/renode.md"};function a(d,e,i,c,u,l){return s(),n("div",null,e[0]||(e[0]=[t(`<h1 id="run-nuttx-on-renode" tabindex="-1">Run NuttX on Renode <a class="header-anchor" href="#run-nuttx-on-renode" aria-label="Permalink to &quot;Run NuttX on Renode&quot;">​</a></h1><p>Renode (<a href="https://renode.io/" target="_blank" rel="noreferrer">https://renode.io/</a>) is and open source virtual development framework dedicated for complex embedded systems.</p><p>This page contains notes on running some of NuttX boards on Renode.</p><h2 id="stm32f4discovery" tabindex="-1">stm32f4discovery <a class="header-anchor" href="#stm32f4discovery" aria-label="Permalink to &quot;stm32f4discovery&quot;">​</a></h2><p>Renode doesn&#39;t support CCM memory, so we have to disable it with <code>CONFIG_MM_REGIONS=1</code>.</p><p>Renode script:</p><pre><code>using sysbus
name?=&quot;STM32F4_Discovery&quot;
mach create name
machine LoadPlatformDescription @platforms/boards/stm32f4_discovery-kit.repl

cpu PerformanceInMips 125

bin?=@nuttx

showAnalyzer sysbus.usart2

macro reset
&quot;&quot;&quot;
  sysbus LoadELF bin
&quot;&quot;&quot;

runMacro reset
</code></pre><p>Tested with <code>stm32f4discovery/nsh</code>.</p><h2 id="nucleo-l073rz" tabindex="-1">nucleo-l073rz <a class="header-anchor" href="#nucleo-l073rz" aria-label="Permalink to &quot;nucleo-l073rz&quot;">​</a></h2><p>Doesn&#39;t work. No BASEPRI implementation for <code>Cotex-M0</code> in NuttX.</p><h2 id="nrf52840-dk" tabindex="-1">nrf52840-dk <a class="header-anchor" href="#nrf52840-dk" aria-label="Permalink to &quot;nrf52840-dk&quot;">​</a></h2><p>At default Renode uses UART with EasyDMA enabled (UARTE) which is not supported by Nuttx yet. We can get around this by creating our own machine description based on Renode default implementation:</p><pre><code>using &quot;platforms/cpus/nrf52840.repl&quot;

uart0:
  easyDMA: false
</code></pre><p>Renode script:</p><pre><code>using sysbus

mach create
machine LoadPlatformDescription @nrf52840_custom.repl

bin?=@nuttx

showAnalyzer uart0

macro reset
&quot;&quot;&quot;
  sysbus LoadELF bin
&quot;&quot;&quot;

runMacro reset
</code></pre><p>Tested with <code>nrf52840-dk/nsh</code>.</p><p>Known issues:</p><ul><li><code>QSPI</code> not implemented in Renode,</li><li><code>PWM</code> doesn&#39;t work, missing <code>NRF52_PWM_EVENTS_SEQSTARTED0_OFFSET</code> implementation in Renode,</li><li><code>ADC</code> doesn&#39;t work, missing <code>NRF52_SAADC_EVENTS_CALDONE_OFFSET</code> implementation in Renode,</li><li><code>SoftDevice</code> doesn&#39;t work, crash in <code>mpsl_init()</code></li></ul><h2 id="stm32f746g-disco" tabindex="-1">stm32f746g-disco <a class="header-anchor" href="#stm32f746g-disco" aria-label="Permalink to &quot;stm32f746g-disco&quot;">​</a></h2><p><code>CONFIG_ARMV7M_BASEPRI_WAR=y</code> must be set.</p><p>Renode script:</p><pre><code>using sysbus
name?=&quot;STM32F746&quot;
mach create name
machine LoadPlatformDescription @platforms/boards/stm32f7_discovery-bb.repl

bin ?= @nuttx

showAnalyzer usart1
showAnalyzer ltdc

macro reset
&quot;&quot;&quot;
  sysbus LoadELF bin
&quot;&quot;&quot;

runMacro reset
</code></pre><p>Tested with <code>stm32f746g-disco/nsh</code>.</p><p>Known issues:</p><ul><li><code>stm32f746g-disco/lvgl</code> - crash due to incompatible I2C our touchscreen driver</li></ul><h2 id="nucleo-h743zi" tabindex="-1">nucleo-h743zi <a class="header-anchor" href="#nucleo-h743zi" aria-label="Permalink to &quot;nucleo-h743zi&quot;">​</a></h2><p>Renode doesn&#39;t support <code>PWR_CSR1_ACTVOSRDY</code> bit so we have to disable it with <code>CONFIG_STM32H7_PWR_IGNORE_ACTVOSRDY=y</code>.</p><p>Renode script:</p><pre><code>using sysbus
mach create &quot;nucleo_h743zi&quot;
include @platforms/boards/nucleo_h753zi.repl

bin=@nuttx

showAnalyzer sysbus.usart3

macro reset
&quot;&quot;&quot;
  sysbus LoadELF bin
&quot;&quot;&quot;

runMacro reset
</code></pre><p>Tested with <code>nucleo-h743zi/nsh</code>.</p>`,30)]))}const h=o(r,[["render",a]]);export{m as __pageData,h as default};
