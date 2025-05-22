import{_ as s,c as t,j as e,a,al as i,o}from"./chunks/framework.NFAqBSgQ.js";const b=JSON.parse('{"title":"nxboot NuttX Bootloader","description":"","frontmatter":{},"headers":[],"relativePath":"en/applications/boot/nxboot/index.md","filePath":"en/applications/boot/nxboot/index.md"}'),r={name:"en/applications/boot/nxboot/index.md"};function p(l,n,d,c,h,u){return o(),t("div",null,n[0]||(n[0]=[e("h1",{id:"nxboot-nuttx-bootloader",tabindex:"-1"},[e("code",null,"nxboot"),a(" NuttX Bootloader "),e("a",{class:"header-anchor",href:"#nxboot-nuttx-bootloader","aria-label":'Permalink to "`nxboot` NuttX Bootloader"'},"​")],-1),e("p",null,"NuttX Bootloader (nxboot) can be used to provide update and recovery capabilities for NuttX based devices. The bootloader implements an algorithm that uses three partitions/areas: primary, secondary and tertiary. Primary area is used to run the image and thus is usually located in a program memory. Secondary and tertiary areas are used to store update image or recovery image and can be located on external flash memory for example.",-1),e("p",null,"The images for the bootloader have version located in their headers. Note that bootloader/image characteristics may differ for different version and a portable application should take this into account.",-1),e("h2",{id:"algorithm-description",tabindex:"-1"},[a("Algorithm Description "),e("a",{class:"header-anchor",href:"#algorithm-description","aria-label":'Permalink to "Algorithm Description"'},"​")],-1),e("p",null,"The update is performed with a simple copy from update area to primary area with recovery being created in recovery area if not already present. Once image is confirmed by the user, the image in update area is confirmed as well, update area becomes recovery area and vice versa. This means the recovery is always present (except for the first update) and subsequent updates just copy image from update to primary. This makes the update significantly faster and more considerable to flash wear while keeping the recovery/revert possibility.",-1),e("p",null,"Not confirmed image is reverted to recovery image if reboot occurs.",-1),e("p",null,[a("The bootable image consists of a header :c"),e("code",{class:"interpreted-text",role:"struct"},"nxboot_img_header"),a(" containing magic value, header version, header size, CRC32 of the image including some parts of the header, size of the image excluding the header, platform identifier, pointer to extended headers and and firmware version. The header is located prior to the image itself and has a configurable size "),e("code",null,"CONFIG_NXBOOT_HEADER_SIZE"),a(". The CRC is calculated from the entire image including header except for magic, header version and header size fields. Extended headers are currently not supported, but the header already has a reserved space for a pointer to it.")],-1),e("p",null,"The image compatible with nxboot bootloader can be uploaded both directly to the primary area via physical programmer as STlink or JTAG and to the update partition via some external application (over Ethernet, USB, CAN, etc.). The update and recovery slots can be located in the the primary flash as well, but this halts the program execution during write operations, so it is not recommended if external flash can be used. The uploaded image is detected by the bootloader during the next boot and update occurs.",-1),e("p",null,[a("Bootloader has an internal magic value that is used to detect updated images. Once update occurs, the image is copied from update to primary partition with the internal magic value and the first erase page of the update slot is erased. The image with internal magic value is considered valid only if its recovery exists, therefore the image confirmation is done by writing the first erase page (copying by write page size from primary) back to the update slot. It is recommended to use :c"),e("code",{class:"interpreted-text",role:"func"},"nxboot_confirm"),a(" API to confirm the image. This approach wears the first sector of the update partition a bit more, but avoids image's tails completely and simplifies both internal and API logic.")],-1),e("p",null,[a("The application can use function :c"),e("code",null,"nxboot_get_state"),a('{.interpreted-text role="func"} to determine what partition is update and recovery and thus where the update image should be stored. It is also possible to use function :c'),e("code",{class:"interpreted-text",role:"func"},"nxboot_open_update_partition"),a(" that determines the correct partition for updates and returns the opened file descriptor. This is a recommended approach as it avoids possible mistakes.")],-1),i(`<h2 id="hardware-requirements" tabindex="-1">Hardware Requirements <a class="header-anchor" href="#hardware-requirements" aria-label="Permalink to &quot;Hardware Requirements&quot;">​</a></h2><p>As mentioned above, the bootloader utilizes three partitions with the first one typically located in program flash.</p><p>The bootloader itself requires the minimal knowledge about characteristics of the underlying storage device. This is achieved by means of the <code>BCH</code> and <code>FTL</code> subsystems, which enable the bootloader to manage MTD partitions via character device drivers using standard POSIX filesystem operations (e.g. <code>open()</code> / <code>close()</code> / <code>read()</code> / <code>write()</code>).</p><p>It is currently required to access the partitions via mentioned <code>BCH</code> and <code>FTL</code> subsystems, but future enhancement could provide a direct access with <code>MTD</code> layer.</p><h2 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;Configuration&quot;">​</a></h2><p>Following configuration options are available:</p><ul><li><p><code>CONFIG_BOOT_NXBOOT</code>: Enables NuttX Bootloader build.</p></li><li></li></ul><pre><code>\`CONFIG_NXBOOT_PRIMARY_SLOT_PATH\`:

:   The path to the application firmware image primary slot
    character device driver. The image runs from this location.
    Default is \`dev/ota0\`.
</code></pre><ul><li></li></ul><pre><code>\`CONFIG_NXBOOT_SECONDARY_SLOT_PATH\`:

:   The path to the application firmware image primary slot
    character device driver. This is either update or recovery
    slot.. Default is \`dev/ota1\`.
</code></pre><ul><li></li></ul><pre><code>\`CONFIG_NXBOOT_TERTIARY_SLOT_PATH\`:

:   The path to the application firmware image primary slot
    character device driver. This is either update or recovery
    slot.. Default is \`dev/ota2\`.
</code></pre><ul><li></li></ul><pre><code>\`CONFIG_NXBOOT_HEADER_SIZE\`:

:   Size of the image header. Note that this size should be aligned
    with the program memory write page size!
</code></pre><ul><li></li></ul><pre><code>\`CONFIG_NXBOOT_PLATFORM_IDENTIFIER\`\\\`:

:   64 bits large platform identifier. This is a unique platform
    identifier used by the bootloader to verify whether the image
    should be run on a given platform. An update (or even a firmware
    uploaded via a programmer) is rejected if the value in image\\&#39;s
    header doesn\\&#39;t match this option.
</code></pre><ul><li></li></ul><pre><code>\`CONFIG_NXBOOT_BOOTLOADER\`:

:   This option builds and links a bootloader application. This
    application should be an entry function for NuttX. It checks for
    possible update/revert operation, performs it and boot the
    correct image.
</code></pre><ul><li></li></ul><pre><code>\`CONFIG_NXBOOT_SWRESET_ONLY\`:

:   This option ensures the update/revert is performed only for
    software reset. This way the board can keep its image (even if
    not confirmed) during for example power shutdown and perform
    update/revert only if expected based on user/maintainer input.
    Following reset causes are considered as software resets.

    \`BOARDIOC_RESETCAUSE_CPU_SOFT\`: software reset

    \`BOARDIOC_RESETCAUSE_CPU_RWDT\`: watchdog error

    \`BOARDIOC_RESETCAUSE_PIN\`: reset button
</code></pre><ul><li></li></ul><pre><code>\`NXBOOT_PREVENT_DOWNGRADE\` :

:   NXboot uses Semantic Version 2.0.0 (without build metadata). By
    default, the update is performed for every version that doesn\\&#39;t
    match the currently running one. If NXBOOT\\_PREVENT\\_DOWNGRADE
    selected, update is performed only for newer versions (according
    to Semantic Version preference rules).

    &gt; \`WARNING\`: NXboot currently implements preferences only for
    &gt; \`MAJOR.MINOR.PATCH\` and ignores prerelease.
</code></pre><h2 id="image-creation" tabindex="-1">Image Creation <a class="header-anchor" href="#image-creation" aria-label="Permalink to &quot;Image Creation&quot;">​</a></h2><p>The image intended to be booted by nxboot bootloader must have prepended header to be recognized and worked with correctly. A Python script <code>nximage.py</code> located in <code>apps/boot/nxboot/tools</code> directory can be used to generate nxboot compatible image.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>python3 apps/boot/nxboot/tools/nximage.py  \\</span></span>
<span class="line"><span>      --version &quot;VERSION&quot; \\</span></span>
<span class="line"><span>      --header_size CONFIG_NXBOOT_HEADER_SIZE \\</span></span>
<span class="line"><span>      --identifier CONFIG_NXBOOT_PLATFORM_IDENTIFIER \\</span></span>
<span class="line"><span>      nuttx.bin image.img</span></span></code></pre></div><p>It takes input parameters <code>--version</code> with your image&#39;s version, <code>--header_size</code> with the configured size of the header and <code>--identifier</code>. with the platform identifier. The input file is a binary <code>nuttx.bin</code>, output with added header is <code>image.img</code>.</p><p>Image version adheres to <a href="https://semver.org/spec/v2.0.0.html" target="_blank" rel="noreferrer">Semantic Versioning 2.0.0</a> without the usage of build metadata. The used format is MAJOR.MINOR:PATCH-prerelease. The image version is important for the update to occur as the bootloader automatically rejects update firmware that has the same version as the already running firmware. Configuration options:</p><h2 id="public-api" tabindex="-1">Public API <a class="header-anchor" href="#public-api" aria-label="Permalink to &quot;Public API&quot;">​</a></h2><p>Enabling <code>CONFIG_BOOT_NXBOOT</code> option provides following NXboot API.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;nxboot.h&gt;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#define NXBOOT_HEADER_PRERELEASE_MAXLEN 94</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct nxboot_img_version</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  /* MAJOR version */</span></span>
<span class="line"><span>  uint16_t major;</span></span>
<span class="line"><span>  /* MINOR version */</span></span>
<span class="line"><span>  uint16_t minor;</span></span>
<span class="line"><span>  /* PATCH version */</span></span>
<span class="line"><span>  uint16_t patch;</span></span>
<span class="line"><span>  /* Additional pre-release version */</span></span>
<span class="line"><span>  char pre_release[NXBOOT_HEADER_PRERELEASE_MAXLEN];</span></span>
<span class="line"><span>};</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct nxboot_hdr_version</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  /* Header major version */</span></span>
<span class="line"><span>  uint8_t major;</span></span>
<span class="line"><span>  /* Header minor version */</span></span>
<span class="line"><span>  uint8_t minor;</span></span>
<span class="line"><span>};</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#define NXBOOT_HEADER_MAGIC     0x534f584e</span></span>
<span class="line"><span>#define NXBOOT_HEADER_MAGIC_INT 0xaca0abb0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct nxboot_img_header</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  /* Header magic */</span></span>
<span class="line"><span>  uint32_t magic;</span></span>
<span class="line"><span>  /* Version of the header */</span></span>
<span class="line"><span>  struct nxboot_hdr_version hdr_version;</span></span>
<span class="line"><span>  /* Size of the header */</span></span>
<span class="line"><span>  uint16_t header_size;</span></span>
<span class="line"><span>  /* CRC of the image, exceluding the previous header fields. */</span></span>
<span class="line"><span>  uint32_t crc;</span></span>
<span class="line"><span>  /* Image size (excluding the header) */</span></span>
<span class="line"><span>  uint32_t size;</span></span>
<span class="line"><span>  /* Platform identifier */</span></span>
<span class="line"><span>  uint64_t identifier;</span></span>
<span class="line"><span>  /* Address of optional extended headers */</span></span>
<span class="line"><span>  uint32_t extd_hdr_ptr;</span></span>
<span class="line"><span>  /* Image version */</span></span>
<span class="line"><span>  struct nxboot_img_version img_version;</span></span>
<span class="line"><span>};</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum nxboot_update_type</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  /* No action to do */</span></span>
<span class="line"><span>  NXBOOT_UPDATE_TYPE_NONE = 0,</span></span>
<span class="line"><span>  /* Update will take place upon reboot */</span></span>
<span class="line"><span>  NXBOOT_UPDATE_TYPE_UPDATE = 1,</span></span>
<span class="line"><span>  /* Revert will take place upon reboot */</span></span>
<span class="line"><span>  NXBOOT_UPDATE_TYPE_REVERT = 2,</span></span>
<span class="line"><span>};</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#define NXBOOT_PRIMARY_SLOT_NUM 0</span></span>
<span class="line"><span>#define NXBOOT_SECONDARY_SLOT_NUM 1</span></span>
<span class="line"><span>#define NXBOOT_TERTIARY_SLOT_NUM 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct nxboot_state</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  /* Number of update slot */</span></span>
<span class="line"><span>  int update;</span></span>
<span class="line"><span>  /* Number of recovery slot */</span></span>
<span class="line"><span>  int recovery;</span></span>
<span class="line"><span>  /* True if recovery image contains valid recovery */</span></span>
<span class="line"><span>  bool recovery_valid;</span></span>
<span class="line"><span>  /* True if image in a primary slot has a recovery (even non valid) */</span></span>
<span class="line"><span>  bool recovery_present;</span></span>
<span class="line"><span>  /* True if primary slot is confirmed */</span></span>
<span class="line"><span>  bool primary_confirmed;</span></span>
<span class="line"><span>  /* True if update slot has a valid image */</span></span>
<span class="line"><span>  enum nxboot_update_type next_boot;</span></span>
<span class="line"><span>};</span></span></code></pre></div>`,35)]))}const g=s(r,[["render",p]]);export{b as __pageData,g as default};
