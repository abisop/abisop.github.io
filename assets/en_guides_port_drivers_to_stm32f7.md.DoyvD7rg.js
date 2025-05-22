import{_ as a,c as s,al as n,o as t}from"./chunks/framework.NFAqBSgQ.js";const f=JSON.parse('{"title":"Porting Drivers to the STM32 F7","description":"","frontmatter":{},"headers":[],"relativePath":"en/guides/port_drivers_to_stm32f7.md","filePath":"en/guides/port_drivers_to_stm32f7.md"}'),i={name:"en/guides/port_drivers_to_stm32f7.md"};function p(r,e,l,c,o,h){return t(),s("div",null,e[0]||(e[0]=[n(`<h1 id="porting-drivers-to-the-stm32-f7" tabindex="-1">Porting Drivers to the STM32 F7 <a class="header-anchor" href="#porting-drivers-to-the-stm32-f7" aria-label="Permalink to &quot;Porting Drivers to the STM32 F7&quot;">​</a></h1><p>Warning</p><p>Migrated from: <a href="https://cwiki.apache.org/confluence/display/NUTTX/Porting+Drivers+to+the+STM32+F7" target="_blank" rel="noreferrer">https://cwiki.apache.org/confluence/display/NUTTX/Porting+Drivers+to+the+STM32+F7</a></p><h2 id="problem-statement" tabindex="-1">Problem Statement <a class="header-anchor" href="#problem-statement" aria-label="Permalink to &quot;Problem Statement&quot;">​</a></h2><p>I recently completed a port to the STMicro STM32F746G Discovery board. That MCU is clearly a derivative of the STM32 F3/F4 and many peripherals are, in fact, essentially identical to the STM32F429. The biggest difference is that the STM32F746 sports a Cortex-M7 which includes several improvements over the Cortex-M4 and including, most relevant to this discussion, a fully integrated data cache ([D-Cache]{.title-ref}).</p><p>Because of this one difference, I chose to provide the STM32 F7 code its own directories separate from the STM32 F1, F2, F3, and F4.</p><h2 id="porting-simple-drivers" tabindex="-1">Porting Simple Drivers <a class="header-anchor" href="#porting-simple-drivers" aria-label="Permalink to &quot;Porting Simple Drivers&quot;">​</a></h2><p>Some of the STM32 F4 drivers can be used with the STM32 F7 can be ported very simply; many ports would just be a matter of copying files and some search-and-replacement. Like:</p><ul><li>Compare the two register definitions files; make sure that the STM32 F4 peripheral is identical (or nearly identical) to the F7 peripheral. If so then,</li><li>Copy the register definition file from the <code>stm32/hardware</code> to the <code>stm32f7/hardware</code> directory, making name changes as appropriate and updating any minor register differences.</li><li>Copy the corresponding C file (and possibly a <code>.h</code> file) from the <code>stm32/</code> directory to the <code>stm32f7/</code> directory, again making any naming changes and modifications for any register differences.</li><li>Update the <code>Make.defs</code> file to include the new C file in the build.</li></ul><h2 id="porting-complex-drivers" tabindex="-1">Porting Complex Drivers <a class="header-anchor" href="#porting-complex-drivers" aria-label="Permalink to &quot;Porting Complex Drivers&quot;">​</a></h2><p>The Cortex-M7 D-Cache, however, does raise issues with the compatibility of most complex STM32 F4 and F7 drivers. Even though the peripheral registers may be essentially the same between the STM32F429 and the the STM32F746, many drivers for the STM32F429 will not be directly compatible with the STM32F746, particularly drivers that use DMA. And that includes most complex STM32 drivers!</p><h2 id="cache-coherency" tabindex="-1">Cache Coherency <a class="header-anchor" href="#cache-coherency" aria-label="Permalink to &quot;Cache Coherency&quot;">​</a></h2><p>With DMA, physical RAM memory contents is accessed directly by peripheral hardware without intervention from the CPU. The CPU itself deals only the indirectly with RAM through the D-Cache: When you read data from RAM, it is first loaded in the D-Cache then accessed by the CPU. If the RAM contents is already in the D-Cache, then physical RAM is not accessed at all! Similarly, when you write data into RAM (with write buffering enabled), it may actually not be written to physical RAM but may just remain in the D-Cache in a [dirty]{.title-ref} cache line until that cache line is flushed to memory. Thus, there may be inconsistencies in the contents of the D-Cache and in the contents of contents of physical RAM due related to DMA. Such issues are referred to as [Cache Coherency]{.title-ref} problems.</p><h2 id="dma" tabindex="-1">DMA <a class="header-anchor" href="#dma" aria-label="Permalink to &quot;DMA&quot;">​</a></h2><h3 id="dma-read-accesses" tabindex="-1">DMA Read Accesses <a class="header-anchor" href="#dma-read-accesses" aria-label="Permalink to &quot;DMA Read Accesses&quot;">​</a></h3><p>A DMA read access occurs when we program DMA hardware to read data from a peripheral and store that data into RAM. This happens, for example, when we read a packet from the network, when we read a serial byte of data from a UART, when we read a block from an MMC/SD card, and so on.</p><p>In this case, the DMA hardware will change the contents of physical RAM without knowledge of the CPU. So if that same memory that was modified by the DMA read operation is also in the D-Cache, then the contents of the D-Cache will no longer be valid; it will no longer match the physical contents of the memory. In order to fix this, the Cortex-M7 supports a special [cache operation]{.title-ref} that can be used to [invalidate]{.title-ref} the D-Cache contents associate with the read DMA buffer address range. Invalidation simply means discarding the currently cached D-Cache lines so that they will be refetched from physical RAM. <strong>Rule 1a</strong>: Always invalidate RX DMA buffers sometime before or after starting the read DMA but certainly [before]{.title-ref} accessing the read buffer data. <strong>Rule 1b</strong>: Never read from the read DMA buffer before the read DMA buffer completes, or otherwise you will re-cache the DMA buffer content.</p><p>[What if the D-Cache line is also dirty? What if we have writes to the DMA buffer that were never flushed to physical RAM?]{.title-ref} Those writes will then never make it to physical memory if the D-Cache is invalidated. <strong>Rule 2</strong>: Never write to read DMA buffer memory! <strong>Rule 3</strong>: Make sure that all DMA read buffers are aligned to the D-Cache line size so that there are no spill-over cache effects at the boarders of the invalidated cache line.</p><h3 id="dma-write-accesses" tabindex="-1">DMA Write Accesses <a class="header-anchor" href="#dma-write-accesses" aria-label="Permalink to &quot;DMA Write Accesses&quot;">​</a></h3><p>A DMA write access occurs when we program DMA hardware to write data from RAM into a peripheral. This happen for example, when we send a packet on a network or when we write a block of data to an MMC/SD card. In this, the hardware expects the correct data to be in physical RAM when write DMA is performed. If not then, the wrong data will be sent.</p><p>We assure that we do not have pending writes in a [dirty]{.title-ref} cache line by [cleaning]{.title-ref} (or [flushing]{.title-ref}) the [dirty]{.title-ref} cache lines; i.e., for forcing any pending writes in the D-Cache lines to be written to physical RAM. <strong>Rule 4</strong>: Always [clean]{.title-ref} (or [flush]{.title-ref}) the D-Cache to force all data to be written from the D-Cache into physical RAM.</p><p>[What if you had two adjacent DMA buffers side-by-side? Couldn&#39;t the cleaning of the write buffer force writing into the adjacent read buffer?]{.title-ref}\` Yes! <strong>Rule 5</strong>: Make sure that all DMA write buffers are aligned to the D-Cache line size so that there are no spill-over cache effects at the borders of the cleaned cache line.</p><h3 id="write-back-vs-write-through-d-cache" tabindex="-1">Write-back vs. Write-through D-Cache <a class="header-anchor" href="#write-back-vs-write-through-d-cache" aria-label="Permalink to &quot;Write-back vs. Write-through D-Cache&quot;">​</a></h3><p>The Cortex-M7 supports both [write-back]{.title-ref} and [write-through]{.title-ref} data cache configurations. The write-back D-Cache works just as described above: [dirty]{.title-ref} cache lines are not written to physical memory until the cache line is flushed. But write-through D-Cache works just as without the D-Cache. Writes always go directly to physical RAM.</p><p>[If I am using a write-through D-Cache, can&#39;t I just forget about cleaning the D-Cache?]{.title-ref} No, because you don&#39;t know how a user is going to configuration the D-Cache. <strong>Rule 6</strong>: Always assume that [write-back]{.title-ref} caching is being performed; otherwise, your driver will not be portable.</p><p>You may notice in <code>/arch/arm/src/armv7-m/cache.h</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#if defined(CONFIG_ARMV7M_DCACHE) &amp;&amp; !defined(CONFIG_ARMV7M_DCACHE_WRITETHROUGH)</span></span>
<span class="line"><span>void arch_clean_dcache(uintptr_t start, uintptr_t end);</span></span>
<span class="line"><span>#else</span></span>
<span class="line"><span>#  define arch_clean_dcache(s,e)</span></span>
<span class="line"><span>#endif</span></span></code></pre></div><p>NOTE: I have experienced other cases (on the SAMV7) where write buffering [must]{.title-ref} be disabled: In one case, a certain peripheral used 16-byte DMA descriptors in an array. Clearly it is impossible to manage the caching of the 16-byte DMA descriptors with a 32-byte cache line in this case: I think that the only option is to disabled the write buffer.</p><p>And what if the driver receives arbitrarily aligned buffers from the application? Then what? Should write buffering be disabled in that case too? And what is the performance cost for disabling the write buffer?</p><h3 id="dma-module" tabindex="-1">DMA Module <a class="header-anchor" href="#dma-module" aria-label="Permalink to &quot;DMA Module&quot;">​</a></h3><p>Some STM32 F7 peripherals have built in DMA. The STM32 F7 Ethernet driver discussed below is a good example of such a peripheral with built in DMA capability. Most STM32 F7 peripherals, however, have no built-in DMA capability and, instead, must use a common STM32 F7 DMA module to perform DMA data transfers. The interfaces to that common DMA module are described in <code>arch/arm/src/stm32f7/stm32_dma.h</code>.</p><p>The DMA modules [does not do any cache operations]{.title-ref}. Rather, the client of the DMA module must perform the cache operations. Here are the basic rules:</p><ul><li>TX DMA Transfers. Before calling <code>stm32_dmastart()</code> to start an TX transfer, the DMA client must clean the DMA buffer so that the content to be DMA&#39;ed is present in physical memory.</li><li>RX DMA transfers. At the completion of all DMAs, the DMA client will receive a callback providing the final status of the DMA transfer. For the case of RX DMA completion callbacks, logic in the callback handler should invalidate the RX buffer before any attempt is made to access new RX buffer content.</li></ul><h2 id="converting-an-stm32f429-driver-for-the-stm32f746" tabindex="-1">Converting an STM32F429 Driver for the STM32F746 <a class="header-anchor" href="#converting-an-stm32f429-driver-for-the-stm32f746" aria-label="Permalink to &quot;Converting an STM32F429 Driver for the STM32F746&quot;">​</a></h2><p>Since the STM32 F7 is so similar to the STM32 F4, we have a wealth of working drivers to port from. Only a little effort is required. Below is a summary of the kinds of things that you would have to do to convert an STM32F429 driver to the STM32F746.</p><h3 id="an-example" tabindex="-1">An Example <a class="header-anchor" href="#an-example" aria-label="Permalink to &quot;An Example&quot;">​</a></h3><p>There is a good example in the STM32 Ethernet driver. The STM32 F7 Ethernet driver (<code>arch/arm/src/stm32f7/stm32_ethernet.c</code>) derives directly from the STM32 F4 Ethernet driver (<code>arch/arm/src/stm32/stm32_eth.c</code>). These two Ethernet MAC peripherals are nearly identical. Only changes that are a direct consequence of the STM32 F7 D-Cache were required to make the driver work on the STM32 F7. Those changes are summarized below.</p><h3 id="reorganize-dma-data-structure" tabindex="-1">Reorganize DMA Data Structure <a class="header-anchor" href="#reorganize-dma-data-structure" aria-label="Permalink to &quot;Reorganize DMA Data Structure&quot;">​</a></h3><p>The STM32 Ethernet driver has four different kinds DMA buffers:</p><ul><li>RX DMA descriptor,</li><li>TX DMA descriptors,</li><li>RX packet buffers, and</li><li>TX packet buffers,</li></ul><p>In the STM32F429 driver, these are simply implemented as part of the driver data structure:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct stm32_ethmac_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>    /* Descriptor allocations */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    struct eth_rxdesc_s rxtable[CONFIG_STM32_ETH_NRXDESC];</span></span>
<span class="line"><span>    struct eth_txdesc_s txtable[CONFIG_STM32_ETH_NTXDESC];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /* Buffer allocations */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    uint8_t rxbuffer[CONFIG_STM32_ETH_NRXDESC*CONFIG_STM32_ETH_BUFSIZE];</span></span>
<span class="line"><span>    uint8_t alloc[STM32_ETH_NFREEBUFFERS*CONFIG_STM32_ETH_BUFSIZE];</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>There are potentially three problems with this: (1) We don&#39;t know what kind of memory the data structure will be defined in. What if it is DTCM memory? Then the DMAs will fail. (2) We don&#39;t know the alignment of the DMA buffers. They must be aligned on D-Cache line boundaries. (3a) The size of RX or TX descriptor is either 16- or 32-bytes. In order to individually clean or invalidate the cache line, they must be sized in multiples of the cache line size and (3b) the same applies to the DMA buffers.</p><p>To fix this, several things were done:</p><ul><li>The buffer allocations were moved from the device structure into separate declarations that can have attributes.</li><li>One attribute that could be added would be a section name to assure that the structures are linked into DMA-able memory (via definitions in the linker script).</li><li>Another attribute is that we can force the alignment of the structure to the D-Cache line size.</li></ul><p>The following definitions were added to support aligning the sizes of the buffers to the Cortex-M7 D-Cache line size:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* Buffers use fro DMA access must begin on an address aligned with the</span></span>
<span class="line"><span>* D-Cache line and must be an even multiple of the D-Cache line size.</span></span>
<span class="line"><span>* These size/alignment requirements are necessary so that D-Cache flush</span></span>
<span class="line"><span>* and invalidate operations will not have any additional effects.</span></span>
<span class="line"><span>*</span></span>
<span class="line"><span>* The TX and RX descriptors are normally 16 bytes in size but could be</span></span>
<span class="line"><span>* 32 bytes in size if the enhanced descriptor format is used (it is not).</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#define DMA_BUFFER_MASK    (ARMV7M_DCACHE_LINESIZE - 1)</span></span>
<span class="line"><span>#define DMA_ALIGN_UP(n)    (((n) + DMA_BUFFER_MASK) &amp; ~DMA_BUFFER_MASK)</span></span>
<span class="line"><span>#define DMA_ALIGN_DOWN(n)  ((n) &amp; ~DMA_BUFFER_MASK)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#ifndef CONFIG_STM32F7_ETH_ENHANCEDDESC</span></span>
<span class="line"><span>#  define RXDESC_SIZE       16</span></span>
<span class="line"><span>#  define TXDESC_SIZE       16</span></span>
<span class="line"><span>#else</span></span>
<span class="line"><span>#  define RXDESC_SIZE       32</span></span>
<span class="line"><span>#  define TXDESC_SIZE       32</span></span>
<span class="line"><span>#endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#define RXDESC_PADSIZE      DMA_ALIGN_UP(RXDESC_SIZE)</span></span>
<span class="line"><span>#define TXDESC_PADSIZE      DMA_ALIGN_UP(TXDESC_SIZE)</span></span>
<span class="line"><span>#define ALIGNED_BUFSIZE     DMA_ALIGN_UP(ETH_BUFSIZE)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#define RXTABLE_SIZE        (STM32F7_NETHERNET * CONFIG_STM32F7_ETH_NRXDESC)</span></span>
<span class="line"><span>#define TXTABLE_SIZE        (STM32F7_NETHERNET * CONFIG_STM32F7_ETH_NTXDESC)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#define RXBUFFER_SIZE       (CONFIG_STM32F7_ETH_NRXDESC * ALIGNED_BUFSIZE)</span></span>
<span class="line"><span>#define RXBUFFER_ALLOC      (STM32F7_NETHERNET * RXBUFFER_SIZE)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#define TXBUFFER_SIZE       (STM32_ETH_NFREEBUFFERS * ALIGNED_BUFSIZE)</span></span>
<span class="line"><span>#define TXBUFFER_ALLOC      (STM32F7_NETHERNET * TXBUFFER_SIZE)</span></span></code></pre></div><p>The RX and TX descriptor types are replace with a union type that assures that the allocations will be aligned in size:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* This union type forces the allocated size of RX descriptors to be the</span></span>
<span class="line"><span>* padded to a exact multiple of the Cortex-M7 D-Cache line size.</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>union stm32_txdesc_u</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  uint8_t             pad[TXDESC_PADSIZE];</span></span>
<span class="line"><span>  struct eth_txdesc_s txdesc;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>union stm32_rxdesc_u</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  uint8_t             pad[RXDESC_PADSIZE];</span></span>
<span class="line"><span>  struct eth_rxdesc_s rxdesc;</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>Then, finally, the new buffers are defined by the following globals:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* DMA buffers.  DMA buffers must:</span></span>
<span class="line"><span>*</span></span>
<span class="line"><span>* 1. Be a multiple of the D-Cache line size.  This requirement is assured</span></span>
<span class="line"><span>*    by the definition of RXDMA buffer size above.</span></span>
<span class="line"><span>* 2. Be aligned a D-Cache line boundaries, and</span></span>
<span class="line"><span>* 3. Be positioned in DMA-able memory (*NOT* DTCM memory).  This must</span></span>
<span class="line"><span>*    be managed by logic in the linker script file.</span></span>
<span class="line"><span>*</span></span>
<span class="line"><span>* These DMA buffers are defined sequentially here to best assure optimal</span></span>
<span class="line"><span>* packing of the buffers.</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Descriptor allocations */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>static union stm32_rxdesc_u g_rxtable[RXTABLE_SIZE]</span></span>
<span class="line"><span>__attribute__((aligned(ARMV7M_DCACHE_LINESIZE)));</span></span>
<span class="line"><span>static union stm32_txdesc_u g_txtable[TXTABLE_SIZE]</span></span>
<span class="line"><span>__attribute__((aligned(ARMV7M_DCACHE_LINESIZE)));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Buffer allocations */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>static uint8_t g_rxbuffer[RXBUFFER_ALLOC]</span></span>
<span class="line"><span>__attribute__((aligned(ARMV7M_DCACHE_LINESIZE)));</span></span>
<span class="line"><span>static uint8_t g_txbuffer[TXBUFFER_ALLOC]</span></span>
<span class="line"><span>__attribute__((aligned(ARMV7M_DCACHE_LINESIZE)));</span></span></code></pre></div><p>This does, of course, force additional changes to the functions that initialize the buffer chains, but I will leave that to the interested reader to discover.</p><h3 id="add-cache-operations" tabindex="-1">Add Cache Operations <a class="header-anchor" href="#add-cache-operations" aria-label="Permalink to &quot;Add Cache Operations&quot;">​</a></h3><p>The Cortex-M7 cache operations are available the following file is included:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &quot;cache.h&quot;</span></span></code></pre></div><p>Here is an example where the RX descriptors are invalidated:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>static int stm32_recvframe(struct stm32_ethmac_s *priv)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>/* Scan descriptors owned by the CPU.  */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rxdesc = priv-&gt;rxhead;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Forces the first RX descriptor to be re-read from physical memory */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>arch_invalidate_dcache((uintptr_t)rxdesc,</span></span>
<span class="line"><span>                        (uintptr_t)rxdesc + sizeof(struct eth_rxdesc_s));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for (i = 0;</span></span>
<span class="line"><span>    (rxdesc-&gt;rdes0 &amp; ETH_RDES0_OWN) == 0 &amp;&amp;</span></span>
<span class="line"><span>        i &lt; CONFIG_STM32F7_ETH_NRXDESC &amp;&amp;</span></span>
<span class="line"><span>        priv-&gt;inflight &lt; CONFIG_STM32F7_ETH_NTXDESC;</span></span>
<span class="line"><span>    i++)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>    /* Try the next descriptor */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    rxdesc = (struct eth_rxdesc_s *)rxdesc-&gt;rdes3;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /* Force the next RX descriptor to be re-read from physical memory */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    arch_invalidate_dcache((uintptr_t)rxdesc,</span></span>
<span class="line"><span>                            (uintptr_t)rxdesc + sizeof(struct eth_rxdesc_s));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Here is an example where a TX descriptor is cleaned:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>static int stm32_transmit(struct stm32_ethmac_s *priv)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>        /* Give the descriptor to DMA */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        txdesc-&gt;tdes0 |= ETH_TDES0_OWN;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        /* Flush the contents of the modified TX descriptor into physical</span></span>
<span class="line"><span>        * memory.</span></span>
<span class="line"><span>        */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        arch_clean_dcache((uintptr_t)txdesc,</span></span>
<span class="line"><span>                            (uintptr_t)txdesc + sizeof(struct eth_txdesc_s));</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Here is where the read buffer is invalidated just after completed a read DMA:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>static int stm32_recvframe(struct stm32_ethmac_s *priv)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>    /* Force the completed RX DMA buffer to be re-read from</span></span>
<span class="line"><span>    * physical memory.</span></span>
<span class="line"><span>    */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    arch_invalidate_dcache((uintptr_t)dev-&gt;d_buf,</span></span>
<span class="line"><span>                        (uintptr_t)dev-&gt;d_buf + dev-&gt;d_len);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    nllvdbg(&quot;rxhead: %p d_buf: %p d_len: %d\\n&quot;,</span></span>
<span class="line"><span>            priv-&gt;rxhead, dev-&gt;d_buf, dev-&gt;d_len);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /* Return success*/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return OK;</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Here is where the write buffer in clean prior to starting a write DMA:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>static int stm32_transmit(struct stm32_ethmac_s *priv)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>/* Flush the contents of the TX buffer into physical memory */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>arch_clean_dcache((uintptr_t)priv-&gt;dev.d_buf,</span></span>
<span class="line"><span>                    (uintptr_t)priv-&gt;dev.d_buf + priv-&gt;dev.d_len);</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,63)]))}const u=a(i,[["render",p]]);export{f as __pageData,u as default};
