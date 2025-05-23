import{_ as t,c as r,al as a,o}from"./chunks/framework.NFAqBSgQ.js";const m=JSON.parse('{"title":"EEPROM","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/drivers/block/eeprom.md","filePath":"en/components/drivers/block/eeprom.md"}'),n={name:"en/components/drivers/block/eeprom.md"};function s(i,e,c,d,l,p){return o(),r("div",null,e[0]||(e[0]=[a(`<h1 id="eeprom" tabindex="-1">EEPROM <a class="header-anchor" href="#eeprom" aria-label="Permalink to &quot;EEPROM&quot;">​</a></h1><p>EEPROMs are a form of Memory</p><p>: Technology Device (MTD). EEPROMs are non-volatile memory like FLASH, but differ in underlying memory technology and differ in usage in many respects: They may not be organized into blocks (at least from the standpoint of the user) and it is not necessary to erase the EEPROM memory before re-writing it. In addition, EEPROMs tend to be much smaller than FLASH parts, usually only a few kilobytes vs megabytes for FLASH. EEPROM tends to be used to retain a small amount of device configuration information; FLASH tends to be used for program or massive data storage. For these reasons, it may not be convenient to use the more complex MTD interface but instead use the simple character interface provided by the EEPROM drivers.</p><h2 id="eeprom-device-support" tabindex="-1">EEPROM Device Support <a class="header-anchor" href="#eeprom-device-support" aria-label="Permalink to &quot;EEPROM Device Support&quot;">​</a></h2><h3 id="drivers-eeprom-spi-xx25xx-c" tabindex="-1">drivers/eeprom/spi_xx25xx.c <a class="header-anchor" href="#drivers-eeprom-spi-xx25xx-c" aria-label="Permalink to &quot;drivers/eeprom/spi\\_xx25xx.c&quot;">​</a></h3><p>This is a driver for SPI EEPROMs that use the same commands as the 25AA160:</p><pre><code>Manufacturer Device     Bytes PgSize AddrLen
Microchip
             25xx010A     128   16     1
             25xx020A     256   16     1
             25AA02UID    256   16     1
             25AA02E48    256   16     1
             25AA02E64    256   16     1
             25xx040      512   16     1+bit
             25xx040A     512   16     1+bit
             25xx080     1024   16     1
             25xx080A    1024   16     2
             25xx080B    1024   32     2
             25xx080C    1024   16     x
             25xx080D    1024   32     x
             25xx160     2048   16     2
             25xx160A/C  2048   16     2    TESTED
             25xx160B/D  2048   32     2
             25xx160C    2048   16     2
             25xx160D    2048   32     2
             25xx320     4096   32     2
             25xx320A    4096   32     2
             25xx640     8192   32     2
             25xx640A    8192   32     2
             25xx128    16384   64     2
             25xx256    32768   64     2
             25xx512    65536  128     2
             25xx1024  131072  256     3
Atmel
             AT25010B     128    8     1
             AT25020B     256    8     1
             AT25040B     512    8     1+bit
             AT25080B    1024   32     2
             AT25160B    2048   32     2
             AT25320B    4096   32     2
             AT25640B    8192   32     2
             AT25128B   16384   64     2
             AT25256B   32768   64     2
             AT25512    65536  128     2
             AT25M01   131072  256     3
</code></pre><h3 id="drivers-mtd-at24xx-c" tabindex="-1">drivers/mtd/at24xx.c <a class="header-anchor" href="#drivers-mtd-at24xx-c" aria-label="Permalink to &quot;drivers/mtd/at24xx.c&quot;">​</a></h3><p>This is a driver for I2C-based at24cxx EEPROM (at24c32, at24c64, at24c128, at24c256, at24c512). This driver is currently provided as an MTD driver but could easily be modified to support the character driver interface.</p><h2 id="file-systems" tabindex="-1">File Systems <a class="header-anchor" href="#file-systems" aria-label="Permalink to &quot;File Systems&quot;">​</a></h2><p>Most EEPROM parts are too small to be candidates for use with a file system. The character driver interface is optimal for these small parts because you can open and access the EEPROM part as if it were a single, fixed size file.</p><p>It is also possible to use these character drivers with a file system. The character driver can converted to a block device using the NuttX loop device. The loop device can be found the file drivers/loop.c. Interface function prototypes can be found in include/nuttx/fs/fs.h:</p><pre><code>int losetup(FAR const char *devname, FAR const char *filename,
            uint16_t sectsize, off_t offset, bool readonly);
</code></pre><p>Given a file or character devices at &#39;filename&#39;, losetup will create the block device &#39;devname&#39; using a bogus sector size of sectsize. &#39;offset&#39; is normally zero but can be used to provide an offset into the EEPROM where the block driver data starts; The EEPROM block driver can also be read-only.</p><p>There is a corresponding function that will destroy the loop device:</p><pre><code>int loteardown(FAR const char *devname);
</code></pre>`,16)]))}const h=t(n,[["render",s]]);export{m as __pageData,h as default};
