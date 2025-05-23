import{_ as s,c as n,al as e,o as p}from"./chunks/framework.NFAqBSgQ.js";const g=JSON.parse('{"title":"Creating an Apache NuttX Release","description":"","frontmatter":{},"headers":[],"relativePath":"en/contributing/releases.md","filePath":"en/contributing/releases.md"}'),t={name:"en/contributing/releases.md"};function l(i,a,c,r,o,h){return p(),n("div",null,a[0]||(a[0]=[e(`<h1 id="creating-an-apache-nuttx-release" tabindex="-1">Creating an Apache NuttX Release <a class="header-anchor" href="#creating-an-apache-nuttx-release" aria-label="Permalink to &quot;Creating an Apache NuttX Release&quot;">​</a></h1><p>NuttX releases are targeted for once every 3 months.</p><h2 id="checkout-the-distribution-svn-repositories" tabindex="-1">Checkout the distribution SVN repositories <a class="header-anchor" href="#checkout-the-distribution-svn-repositories" aria-label="Permalink to &quot;Checkout the distribution SVN repositories&quot;">​</a></h2><p>Releases are managed through an SVN repository. There are two locations where releases can be committed dev and release. Prior to voting a release is staged in the dev folder after a release is approved by the IPMC it is then moved to the release location and committed for distribution. The release folder also holds the GPG public keys that are used for signing release in a KEYS file.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> svn checkout https://dist.apache.org/repos/dist/dev/nuttx nuttx-dev</span></span>
<span class="line"><span> svn checkout https://dist.apache.org/repos/dist/release/nuttx nuttx-release</span></span></code></pre></div><h2 id="adding-your-gpg-key" tabindex="-1">Adding your GPG key <a class="header-anchor" href="#adding-your-gpg-key" aria-label="Permalink to &quot;Adding your GPG key&quot;">​</a></h2><p>Inside of the <code>dist/release/nuttx folder</code> is a KEYS file where committers must upload their GPG public key that they use to sign releases. On the top of the file you can see instructions on how to add your key to this file. Be careful to not remove any existing keys. There is a KEYS file in both the dev and releases folder, but uploading to the releases folder is the important one.</p><p>If you have not created a GPG key for use with this project see <a href="https://infra.apache.org/openpgp.html#generate-key" target="_blank" rel="noreferrer">https://infra.apache.org/openpgp.html#generate-key</a> It is important that your Apache email is associated with this key.</p><p>My key id is <code>3554D78458CEB6954B020E12E1B6E30DB05D6280</code>. You can list the keys that you have a secret key for with this command. Make sure your Apache email is associated with this key.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> gpg2 --list-secret-keys</span></span>
<span class="line"><span> /home/bashton/.gnupg/pubring.kbx</span></span>
<span class="line"><span> --------------------------------</span></span>
<span class="line"><span> sec&gt;  rsa4096 2019-11-24 [SC] [expires: 2021-09-02]</span></span>
<span class="line"><span>       3554D78458CEB6954B020E12E1B6E30DB05D6280</span></span>
<span class="line"><span>       Card serial no. = 0006 09239558</span></span>
<span class="line"><span> uid           [ultimate] Brennan Ashton &lt;btashton@apache.org&gt;</span></span>
<span class="line"><span> uid           [ultimate] Brennan Ashton &lt;bashton@brennanashton.com&gt;</span></span>
<span class="line"><span> ssb&gt;  rsa4096 2019-11-24 [E] [expires: 2021-09-02]</span></span>
<span class="line"><span> ssb&gt;  rsa4096 2019-11-24 [A] [expires: 2021-09-02]</span></span>
<span class="line"><span> ssb   rsa4096 2019-11-24 [S] [expires: 2021-09-02]</span></span></code></pre></div><p>You can then use this command to add to the KEYS file (fill in &quot;key id&quot; with your key id):</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> (gpg --list-sigs &lt;key id&gt; &amp;&amp; gpg --armor --export &lt;key id&gt;) &gt;&gt; KEYS</span></span></code></pre></div><p>You can verify your key is in the file with:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> cat KEYS | gpg2 --import-options show-only</span></span></code></pre></div><p>Once you are happy with your changes you can commit your key</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> svn commit -m &quot;Update &lt;my name&gt; GPG key&quot;</span></span></code></pre></div><h2 id="add-your-gpg-key-to-github-apache" tabindex="-1">Add your GPG key to GitHub / Apache <a class="header-anchor" href="#add-your-gpg-key-to-github-apache" aria-label="Permalink to &quot;Add your GPG key to GitHub / Apache&quot;">​</a></h2><p>So that the release tags show up as &quot;verified&quot; attach your GPG key to your Apache and GitHub accounts:</p><ul><li>GitHub: <a href="https://docs.github.com/en/github/authenticating-to-github/adding-a-new-gpg-key-to-your-github-account" target="_blank" rel="noreferrer">https://docs.github.com/en/github/authenticating-to-github/adding-a-new-gpg-key-to-your-github-account</a></li><li>Apache: <a href="https://id.apache.org" target="_blank" rel="noreferrer">https://id.apache.org</a><ul><li><em>Add the fingerprint to OpenPGP Public Key Primary Fingerprint</em></li></ul></li></ul><h2 id="creating-a-release-candidate" tabindex="-1">Creating a Release Candidate <a class="header-anchor" href="#creating-a-release-candidate" aria-label="Permalink to &quot;Creating a Release Candidate&quot;">​</a></h2><p>When the project is happy with a release branch and is ready to create a release candidate, the first step is to create a signed tag. This should be done for both the nuttx and nuttx-apps repositories.</p><p>This is an example for tagging RC0 for the 12.1.0 release. Only the OS repository is shown here this must also be done for the apps repository.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Export the signing key</span></span>
<span class="line"><span> export GPG_TTY=(tty)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Checkout the release branch</span></span>
<span class="line"><span>~/nuttx/wrk/nuttx on  releases/12.1 [] </span></span>
<span class="line"><span> git checkout releases/12.1</span></span>
<span class="line"><span>Already on &#39;releases/12.1&#39;</span></span>
<span class="line"><span>Your branch is up to date with &#39;origin/releases/12.1&#39;.</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Make sure it is up-to-date with upstream</span></span>
<span class="line"><span>~/nuttx/wrk/nuttx on  releases/12.1 [] </span></span>
<span class="line"><span> git pull</span></span>
<span class="line"><span>Already up to date.</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Make create the signed tag (note the -s option)</span></span>
<span class="line"><span>~/nuttx/wrk/nuttx on  releases/12.1 [] </span></span>
<span class="line"><span> git tag -s nuttx-12.1.0-RC0 -m nuttx-12.1.0-RC0</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Verify the tag is on the correct commit</span></span>
<span class="line"><span>~/nuttx/wrk/nuttx on  releases/12.1 [] </span></span>
<span class="line"><span> git log -n 1</span></span>
<span class="line"><span>commit 16748108c503d762779545d40113825e54b75252 (HEAD -&gt; releases/12.1, tag: nuttx-12.1.0-RC0, origin/releases/12.1)</span></span>
<span class="line"><span>Author: Dong Heng &lt;dongheng@espressif.com&gt;</span></span>
<span class="line"><span>Date:   Fri Apr 9 20:03:24 2021 +0800</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    riscv/esp32c3: Fix heap end address</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Push the tag to the apache repository</span></span>
<span class="line"><span>~/nuttx/wrk/nuttx on  releases/12.1 [] </span></span>
<span class="line"><span> git push -u origin nuttx-12.1.0-RC0</span></span>
<span class="line"><span>Enumerating objects: 1, done.</span></span>
<span class="line"><span>Counting objects: 100% (1/1), done.</span></span>
<span class="line"><span>Writing objects: 100% (1/1), 805 bytes | 402.00 KiB/s, done.</span></span>
<span class="line"><span>Total 1 (delta 0), reused 0 (delta 0), pack-reused 0</span></span>
<span class="line"><span>To github.com:apache/nuttx.git</span></span>
<span class="line"><span> * [new tag]               nuttx-12.1.0-RC0 -&gt; nuttx-12.1.0-RC0</span></span></code></pre></div><p>You should be able to see the tag here <a href="https://github.com/apache/nuttx/tags" target="_blank" rel="noreferrer">https://github.com/apache/nuttx/tags</a> and <a href="https://github.com/apache/nuttx-apps/tags" target="_blank" rel="noreferrer">https://github.com/apache/nuttx-apps/tags</a>.</p><h2 id="creating-the-release-tarballs" tabindex="-1">Creating the Release Tarballs <a class="header-anchor" href="#creating-the-release-tarballs" aria-label="Permalink to &quot;Creating the Release Tarballs&quot;">​</a></h2><p>Make sure that you have both repositories checked to the correct release candidate tag. The folder names must be <code>nuttx</code> and <code>apps</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~/nuttx/wrk/release </span></span>
<span class="line"><span> ls</span></span>
<span class="line"><span>apps  nuttx</span></span>
<span class="line"><span></span></span>
<span class="line"><span>~/nuttx/wrk/release </span></span>
<span class="line"><span> git -C nuttx log -n 1</span></span>
<span class="line"><span>commit 16748108c503d762779545d40113825e54b75252 (HEAD -&gt; releases/12.1, tag: nuttx-12.1.0-RC0, origin/releases/12.1)</span></span>
<span class="line"><span>Author: Dong Heng &lt;dongheng@espressif.com&gt;</span></span>
<span class="line"><span>Date:   Fri Apr 9 20:03:24 2021 +0800</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    riscv/esp32c3: Fix heap end address</span></span>
<span class="line"><span></span></span>
<span class="line"><span>~/nuttx/wrk/release </span></span>
<span class="line"><span> git -C apps log -n 1</span></span>
<span class="line"><span>commit 4348d91d1356335483089c3865282d80f13bedcd (HEAD -&gt; releases/12.1, tag: nuttx-12.1.0-RC0, origin/releases/12.1)</span></span>
<span class="line"><span>Author: Abdelatif Guettouche &lt;abdelatif.guettouche@espressif.com&gt;</span></span>
<span class="line"><span>Date:   Mon Apr 12 10:11:05 2021 +0200</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    wireless/wapi/src/wapi.c: When executing a command return it&#39;s error code on failure.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Signed-off-by: Abdelatif Guettouche &lt;abdelatif.guettouche@espressif.com&gt;</span></span></code></pre></div><p>When creating the release tarballs consider enabling debug mode with the <code>-d</code> flag to make sure everything looks correct including using the correct folders. Note that here we do not use the RC in the version. If this RC is accepted these exact files will be moved from dev to the release folder, the tarballs are <em>not</em> recreated. Here is an example signing using my key id and the 12.1.0 release:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~/nuttx/wrk/release took 2s </span></span>
<span class="line"><span> ./nuttx/tools/zipme.sh -d -s -k 3554D78458CEB6954B020E12E1B6E30DB05D6280 12.1.0</span></span>
<span class="line"><span>+ DEBUG=-d</span></span>
<span class="line"><span>+ shift</span></span>
<span class="line"><span>+ &#39;[&#39; &#39;!&#39; -z -s &#39;]&#39;</span></span>
<span class="line"><span>+ case 1 in</span></span>
<span class="line"><span>+ sign=1</span></span>
<span class="line"><span>+ shift</span></span>
<span class="line"><span>+ &#39;[&#39; &#39;!&#39; -z -k &#39;]&#39;</span></span>
<span class="line"><span>+ case 1 in</span></span>
<span class="line"><span>+ shift</span></span>
<span class="line"><span>+ GPG+=&#39; --default-key 3554D78458CEB6954B020E12E1B6E30DB05D6280&#39;</span></span>
<span class="line"><span>+ shift</span></span>
<span class="line"><span>+ &#39;[&#39; &#39;!&#39; -z 12.1.0 &#39;]&#39;</span></span>
<span class="line"><span>+ case 1 in</span></span>
<span class="line"><span>+ break</span></span>
<span class="line"><span>+ VERSION=12.1.0</span></span>
<span class="line"><span>+ &#39;[&#39; -n 12.1.0 &#39;]&#39;</span></span>
<span class="line"><span>+ VERSIONOPT=&#39;-v 12.1.0&#39;</span></span>
<span class="line"><span>+ for pat in {EXCLPAT}</span></span>
<span class="line"><span>+ TAR+=&#39; --exclude=.github&#39;</span></span>
<span class="line"><span>+ for pat in {EXCLPAT}</span></span>
<span class="line"><span>+ TAR+=&#39; --exclude=.asf.yaml&#39;</span></span>
<span class="line"><span>+ TAR+=&#39; --exclude-vcs&#39;</span></span>
<span class="line"><span>+ &#39;[&#39; 0 &#39;!=&#39; 0 &#39;]&#39;</span></span>
<span class="line"><span>+ TAR+=&#39; -czf&#39;</span></span>
<span class="line"><span>++ basename ./nuttx/tools/zipme.sh</span></span>
<span class="line"><span>+ MYNAME=zipme.sh</span></span>
<span class="line"><span>+ &#39;[&#39; -x /home/bashton/nuttx/wrk/release/zipme.sh &#39;]&#39;</span></span>
<span class="line"><span>+ &#39;[&#39; -x /home/bashton/nuttx/wrk/release/tools/zipme.sh &#39;]&#39;</span></span>
<span class="line"><span>+ &#39;[&#39; -x /home/bashton/nuttx/wrk/release/nuttx/tools/zipme.sh &#39;]&#39;</span></span>
<span class="line"><span>+ TRUNKDIR=/home/bashton/nuttx/wrk/release</span></span>
<span class="line"><span>+ NUTTXDIR=/home/bashton/nuttx/wrk/release/nuttx</span></span>
<span class="line"><span>+ APPSDIR=/home/bashton/nuttx/wrk/release/apps</span></span>
<span class="line"><span>+ &#39;[&#39; &#39;!&#39; -d /home/bashton/nuttx/wrk/release &#39;]&#39;</span></span>
<span class="line"><span>+ cd /home/bashton/nuttx/wrk/release</span></span>
<span class="line"><span>+ &#39;[&#39; &#39;!&#39; -d /home/bashton/nuttx/wrk/release/nuttx &#39;]&#39;</span></span>
<span class="line"><span>+ &#39;[&#39; &#39;!&#39; -d /home/bashton/nuttx/wrk/release/apps &#39;]&#39;</span></span>
<span class="line"><span>+ echo &#39;Cleaning the repositories&#39;</span></span>
<span class="line"><span>Cleaning the repositories</span></span>
<span class="line"><span>+ &#39;[&#39; 0 &#39;!=&#39; 0 &#39;]&#39;</span></span>
<span class="line"><span>+ make -C /home/bashton/nuttx/wrk/release/nuttx distclean</span></span>
<span class="line"><span>+ VERSIONSH=/home/bashton/nuttx/wrk/release/nuttx/tools/version.sh</span></span>
<span class="line"><span>+ &#39;[&#39; &#39;!&#39; -x /home/bashton/nuttx/wrk/release/nuttx/tools/version.sh &#39;]&#39;</span></span>
<span class="line"><span>+ /home/bashton/nuttx/wrk/release/nuttx/tools/version.sh -d -v 12.1.0 /home/bashton/nuttx/wrk/release/nuttx/.version</span></span>
<span class="line"><span>+ shift</span></span>
<span class="line"><span>+ &#39;[&#39; &#39;!&#39; -z -v &#39;]&#39;</span></span>
<span class="line"><span>+ case 1 in</span></span>
<span class="line"><span>+ shift</span></span>
<span class="line"><span>+ VERSION=12.1.0</span></span>
<span class="line"><span>+ shift</span></span>
<span class="line"><span>+ &#39;[&#39; &#39;!&#39; -z /home/bashton/nuttx/wrk/release/nuttx/.version &#39;]&#39;</span></span>
<span class="line"><span>+ case 1 in</span></span>
<span class="line"><span>+ break</span></span>
<span class="line"><span>+ OUTFILE=/home/bashton/nuttx/wrk/release/nuttx/.version</span></span>
<span class="line"><span>+ &#39;[&#39; -z 12.1.0 &#39;]&#39;</span></span>
<span class="line"><span>+ &#39;[&#39; -z 12.1.0 &#39;]&#39;</span></span>
<span class="line"><span>+ &#39;[&#39; -z /home/bashton/nuttx/wrk/release/nuttx/.version &#39;]&#39;</span></span>
<span class="line"><span>++ echo 12.1.0</span></span>
<span class="line"><span>++ cut -d. -f1</span></span>
<span class="line"><span>+ MAJOR=10</span></span>
<span class="line"><span>+ &#39;[&#39; X10 = X12.1.0 &#39;]&#39;</span></span>
<span class="line"><span>++ echo 12.1.0</span></span>
<span class="line"><span>++ cut -d. -f2</span></span>
<span class="line"><span>+ MINOR=1</span></span>
<span class="line"><span>+ &#39;[&#39; X12.1 = X12.1.0 &#39;]&#39;</span></span>
<span class="line"><span>++ echo 12.1.0</span></span>
<span class="line"><span>++ grep -Eo &#39;[0-9]+\\.[0-9]+\\.[0-9]+&#39;</span></span>
<span class="line"><span>++ cut -d. -f3</span></span>
<span class="line"><span>+ PATCH=0</span></span>
<span class="line"><span>+ &#39;[&#39; -z &#39;&#39; &#39;]&#39;</span></span>
<span class="line"><span>++ git -C /home/bashton/nuttx/wrk/release/nuttx/tools log --oneline -1</span></span>
<span class="line"><span>++ cut &#39;-d &#39; -f1</span></span>
<span class="line"><span>+ BUILD=16748108c5</span></span>
<span class="line"><span>+ &#39;[&#39; -z 16748108c5 &#39;]&#39;</span></span>
<span class="line"><span>++ git -C /home/bashton/nuttx/wrk/release/nuttx/tools diff-index --name-only HEAD</span></span>
<span class="line"><span>++ head -1</span></span>
<span class="line"><span>+ &#39;[&#39; -n &#39;&#39; &#39;]&#39;</span></span>
<span class="line"><span>+ echo &#39;#!/bin/bash&#39;</span></span>
<span class="line"><span>+ echo &#39;&#39;</span></span>
<span class="line"><span>+ echo &#39;CONFIG_VERSION_STRING=&quot;12.1.0&quot;&#39;</span></span>
<span class="line"><span>+ echo CONFIG_VERSION_MAJOR=10</span></span>
<span class="line"><span>+ echo CONFIG_VERSION_MINOR=1</span></span>
<span class="line"><span>+ echo CONFIG_VERSION_PATCH=0</span></span>
<span class="line"><span>+ echo &#39;CONFIG_VERSION_BUILD=&quot;16748108c5&quot;&#39;</span></span>
<span class="line"><span>+ chmod 755 /home/bashton/nuttx/wrk/release/nuttx/.version</span></span>
<span class="line"><span>+ &#39;[&#39; -z 12.1.0 &#39;]&#39;</span></span>
<span class="line"><span>+ NUTTX_TARNAME=apache-nuttx-12.1.0.tar</span></span>
<span class="line"><span>+ APPS_TARNAME=apache-nuttx-apps-12.1.0.tar</span></span>
<span class="line"><span>+ NUTTX_ZIPNAME=apache-nuttx-12.1.0.tar.gz</span></span>
<span class="line"><span>+ APPS_ZIPNAME=apache-nuttx-apps-12.1.0.tar.gz</span></span>
<span class="line"><span>+ NUTTX_ASCNAME=apache-nuttx-12.1.0.tar.gz.asc</span></span>
<span class="line"><span>+ APPS_ASCNAME=apache-nuttx-apps-12.1.0.tar.gz.asc</span></span>
<span class="line"><span>+ NUTTX_SHANAME=apache-nuttx-12.1.0.tar.gz.sha512</span></span>
<span class="line"><span>+ APPS_SHANAME=apache-nuttx-apps-12.1.0.tar.gz.sha512</span></span>
<span class="line"><span>+ &#39;[&#39; -f apache-nuttx-12.1.0.tar &#39;]&#39;</span></span>
<span class="line"><span>+ &#39;[&#39; -f apache-nuttx-12.1.0.tar.gz &#39;]&#39;</span></span>
<span class="line"><span>+ echo &#39;Removing /home/bashton/nuttx/wrk/release/apache-nuttx-12.1.0.tar.gz&#39;</span></span>
<span class="line"><span>Removing /home/bashton/nuttx/wrk/release/apache-nuttx-12.1.0.tar.gz</span></span>
<span class="line"><span>+ rm -f apache-nuttx-12.1.0.tar.gz</span></span>
<span class="line"><span>+ &#39;[&#39; -f apache-nuttx-apps-12.1.0.tar &#39;]&#39;</span></span>
<span class="line"><span>+ &#39;[&#39; -f apache-nuttx-apps-12.1.0.tar.gz &#39;]&#39;</span></span>
<span class="line"><span>+ &#39;[&#39; -f apache-nuttx-12.1.0.tar.gz.asc &#39;]&#39;</span></span>
<span class="line"><span>+ &#39;[&#39; -f apache-nuttx-apps-12.1.0.tar.gz.asc &#39;]&#39;</span></span>
<span class="line"><span>+ &#39;[&#39; -f apache-nuttx-12.1.0.tar.gz.sha512 &#39;]&#39;</span></span>
<span class="line"><span>+ &#39;[&#39; -f apache-nuttx-apps-12.1.0.tar.gz.sha512 &#39;]&#39;</span></span>
<span class="line"><span>+ echo &#39;Archiving and zipping nuttx/&#39;</span></span>
<span class="line"><span>Archiving and zipping nuttx/</span></span>
<span class="line"><span>++ basename /home/bashton/nuttx/wrk/release/nuttx</span></span>
<span class="line"><span>+ tar --exclude=.github --exclude=.asf.yaml --exclude-vcs -czf apache-nuttx-12.1.0.tar.gz nuttx</span></span>
<span class="line"><span>+ echo &#39;Archiving and zipping apps/&#39;</span></span>
<span class="line"><span>Archiving and zipping apps/</span></span>
<span class="line"><span>++ basename /home/bashton/nuttx/wrk/release/apps</span></span>
<span class="line"><span>+ tar --exclude=.github --exclude=.asf.yaml --exclude-vcs -czf apache-nuttx-apps-12.1.0.tar.gz apps</span></span>
<span class="line"><span>+ echo &#39;Creating the hashes&#39;</span></span>
<span class="line"><span>Creating the hashes</span></span>
<span class="line"><span>+ sha512sum apache-nuttx-12.1.0.tar.gz</span></span>
<span class="line"><span>+ sha512sum apache-nuttx-apps-12.1.0.tar.gz</span></span>
<span class="line"><span>+ &#39;[&#39; 1 &#39;!=&#39; 0 &#39;]&#39;</span></span>
<span class="line"><span>+ echo &#39;Signing the tarballs&#39;</span></span>
<span class="line"><span>Signing the tarballs</span></span>
<span class="line"><span>+ gpg -sab --default-key 3554D78458CEB6954B020E12E1B6E30DB05D6280 apache-nuttx-12.1.0.tar.gz</span></span>
<span class="line"><span>gpg: using &quot;3554D78458CEB6954B020E12E1B6E30DB05D6280&quot; as default secret key for signing</span></span>
<span class="line"><span>+ gpg -sab --default-key 3554D78458CEB6954B020E12E1B6E30DB05D6280 apache-nuttx-apps-12.1.0.tar.gz</span></span>
<span class="line"><span>gpg: using &quot;3554D78458CEB6954B020E12E1B6E30DB05D6280&quot; as default secret key for signing</span></span>
<span class="line"><span>+ cd /home/bashton/nuttx/wrk/release/nuttx</span></span>
<span class="line"><span></span></span>
<span class="line"><span>~/nuttx/wrk/release took 6s </span></span>
<span class="line"><span> ls</span></span>
<span class="line"><span>apache-nuttx-12.1.0.tar.gz      apache-nuttx-12.1.0.tar.gz.sha512  apache-nuttx-apps-12.1.0.tar.gz.asc     apps</span></span>
<span class="line"><span>apache-nuttx-12.1.0.tar.gz.asc  apache-nuttx-apps-12.1.0.tar.gz    apache-nuttx-apps-12.1.0.tar.gz.sha512  nuttx</span></span></code></pre></div><h2 id="check-the-release-artifacts" tabindex="-1">Check the release artifacts <a class="header-anchor" href="#check-the-release-artifacts" aria-label="Permalink to &quot;Check the release artifacts&quot;">​</a></h2><p>Prior to uploading the artifacts it is a good idea to make sure that they pass a sanity check. You can do this by running the <code>nuttx/tools/checkrelease.sh</code> script on them. This will only use the GPG keys at <a href="https://dist.apache.org/repos/dist/dev/nuttx/KEYS" target="_blank" rel="noreferrer">https://dist.apache.org/repos/dist/dev/nuttx/KEYS</a> so make sure.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~/nuttx/wrk/release </span></span>
<span class="line"><span> ./nuttx/tools/checkrelease.sh --dir ./</span></span>
<span class="line"><span>gpg: directory &#39;/tmp/nuttx-checkrelease/.gnupg&#39; created</span></span>
<span class="line"><span>gpg: keybox &#39;/tmp/nuttx-checkrelease/.gnupg/pubring.kbx&#39; created</span></span>
<span class="line"><span>gpg: /tmp/nuttx-checkrelease/.gnupg/trustdb.gpg: trustdb created</span></span>
<span class="line"><span>gpg: key E1B6E30DB05D6280: public key &quot;Brennan Ashton &lt;btashton@apache.org&gt;&quot; imported</span></span>
<span class="line"><span>gpg: Total number processed: 1</span></span>
<span class="line"><span>gpg:               imported: 1</span></span>
<span class="line"><span> OK: https://dist.apache.org/repos/dist/dev/nuttx/KEYS is imported.</span></span>
<span class="line"><span>Checking apache-nuttx-12.1.0.tar.gz sha512...</span></span>
<span class="line"><span> OK: apache-nuttx-12.1.0.tar.gz sha512 hash matches.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Checking apache-nuttx-12.1.0.tar.gz GPG signature:</span></span>
<span class="line"><span>gpg: Signature made Sat 17 Apr 2021 08:02:29 PM PDT</span></span>
<span class="line"><span>gpg:                using RSA key 66C4832A165ECC9354895A209750ED7E692B99E2</span></span>
<span class="line"><span>gpg: Good signature from &quot;Brennan Ashton &lt;btashton@apache.org&gt;&quot; [unknown]</span></span>
<span class="line"><span>gpg:                 aka &quot;Brennan Ashton &lt;bashton@brennanashton.com&gt;&quot; [unknown]</span></span>
<span class="line"><span>gpg: WARNING: This key is not certified with a trusted signature!</span></span>
<span class="line"><span>gpg:          There is no indication that the signature belongs to the owner.</span></span>
<span class="line"><span>Primary key fingerprint: 3554 D784 58CE B695 4B02  0E12 E1B6 E30D B05D 6280</span></span>
<span class="line"><span>     Subkey fingerprint: 66C4 832A 165E CC93 5489  5A20 9750 ED7E 692B 99E2</span></span>
<span class="line"><span> OK: apache-nuttx-12.1.0.tar.gz gpg signature matches.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Checking apache-nuttx-12.1.0.tar.gz for required files:</span></span>
<span class="line"><span> OK: all required files exist in nuttx.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Checking apache-nuttx-apps-12.1.0.tar.gz sha512...</span></span>
<span class="line"><span> OK: apache-nuttx-apps-12.1.0.tar.gz sha512 hash matches.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Checking apache-nuttx-apps-12.1.0.tar.gz GPG signature:</span></span>
<span class="line"><span>gpg: Signature made Sat 17 Apr 2021 08:02:30 PM PDT</span></span>
<span class="line"><span>gpg:                using RSA key 66C4832A165ECC9354895A209750ED7E692B99E2</span></span>
<span class="line"><span>gpg: Good signature from &quot;Brennan Ashton &lt;btashton@apache.org&gt;&quot; [unknown]</span></span>
<span class="line"><span>gpg:                 aka &quot;Brennan Ashton &lt;bashton@brennanashton.com&gt;&quot; [unknown]</span></span>
<span class="line"><span>gpg: WARNING: This key is not certified with a trusted signature!</span></span>
<span class="line"><span>gpg:          There is no indication that the signature belongs to the owner.</span></span>
<span class="line"><span>Primary key fingerprint: 3554 D784 58CE B695 4B02  0E12 E1B6 E30D B05D 6280</span></span>
<span class="line"><span>     Subkey fingerprint: 66C4 832A 165E CC93 5489  5A20 9750 ED7E 692B 99E2</span></span>
<span class="line"><span> OK: apache-nuttx-apps-12.1.0.tar.gz gpg signature matches.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Checking apache-nuttx-apps-12.1.0.tar.gz for required files:</span></span>
<span class="line"><span> OK: all required files exist in apps.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Trying to build nuttx sim:nsh...</span></span>
<span class="line"><span> OK: we were able to build sim:nsh.</span></span></code></pre></div><h2 id="staging-the-release-candidate" tabindex="-1">Staging the release candidate <a class="header-anchor" href="#staging-the-release-candidate" aria-label="Permalink to &quot;Staging the release candidate&quot;">​</a></h2><p>To stage a release a new folder should be created under <a href="https://dist.apache.org/repos/dist/dev/nuttx" target="_blank" rel="noreferrer">https://dist.apache.org/repos/dist/dev/nuttx</a> for the release candidate and these release artifacts should be copied there:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apache-nuttx-&lt;version&gt;.tar.gz      apache-nuttx-&lt;version&gt;.tar.gz.sha512  apache-nuttx-apps-&lt;version&gt;.tar.gz.asc</span></span>
<span class="line"><span>apache-nuttx-&lt;version&gt;.tar.gz.asc  apache-nuttx-apps-&lt;version&gt;.tar.gz    apache-nuttx-apps-&lt;version&gt;.tar.gz.sha512</span></span></code></pre></div><p>If you checked that svn repository out as shown earlier as nuttx-dev. This should be done like this:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~/nuttx/svn/nuttx-dev </span></span>
<span class="line"><span> mkdir 12.1.0-RC0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>~/nuttx/svn/nuttx-dev </span></span>
<span class="line"><span> cp -v ../../wrk/release/apache-{nuttx,nuttx-apps}-12.1.0.tar.gz* ./12.1.0-RC0/</span></span>
<span class="line"><span>&#39;../../wrk/release/apache-nuttx-12.1.0.tar.gz&#39; -&gt; &#39;./12.1.0-RC0/apache-nuttx-12.1.0.tar.gz&#39;</span></span>
<span class="line"><span>&#39;../../wrk/release/apache-nuttx-12.1.0.tar.gz.asc&#39; -&gt; &#39;./12.1.0-RC0/apache-nuttx-12.1.0.tar.gz.asc&#39;</span></span>
<span class="line"><span>&#39;../../wrk/release/apache-nuttx-12.1.0.tar.gz.sha512&#39; -&gt; &#39;./12.1.0-RC0/apache-nuttx-12.1.0.tar.gz.sha512&#39;</span></span>
<span class="line"><span>&#39;../../wrk/release/apache-nuttx-apps-12.1.0.tar.gz&#39; -&gt; &#39;./12.1.0-RC0/apache-nuttx-apps-12.1.0.tar.gz&#39;</span></span>
<span class="line"><span>&#39;../../wrk/release/apache-nuttx-apps-12.1.0.tar.gz.asc&#39; -&gt; &#39;./12.1.0-RC0/apache-nuttx-apps-12.1.0.tar.gz.asc&#39;</span></span>
<span class="line"><span>&#39;../../wrk/release/apache-nuttx-apps-12.1.0.tar.gz.sha512&#39; -&gt; &#39;./12.1.0-RC0/apache-nuttx-apps-12.1.0.tar.gz.sha512&#39;</span></span></code></pre></div><p>Then commit these files:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~/nuttx/svn/nuttx-dev </span></span>
<span class="line"><span> svn status</span></span>
<span class="line"><span>?       12.1.0-RC0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>~/nuttx/svn/nuttx-dev </span></span>
<span class="line"><span> svn add 12.1.0-RC0/</span></span>
<span class="line"><span>A         12.1.0-RC0</span></span>
<span class="line"><span>A         12.1.0-RC0/apache-nuttx-12.1.0.tar.gz.sha512</span></span>
<span class="line"><span>A         12.1.0-RC0/apache-nuttx-apps-12.1.0.tar.gz.sha512</span></span>
<span class="line"><span>A  (bin)  12.1.0-RC0/apache-nuttx-12.1.0.tar.gz.asc</span></span>
<span class="line"><span>A  (bin)  12.1.0-RC0/apache-nuttx-apps-12.1.0.tar.gz.asc</span></span>
<span class="line"><span>A  (bin)  12.1.0-RC0/apache-nuttx-12.1.0.tar.gz</span></span>
<span class="line"><span>A  (bin)  12.1.0-RC0/apache-nuttx-apps-12.1.0.tar.gz</span></span>
<span class="line"><span></span></span>
<span class="line"><span>~/nuttx/svn/nuttx-dev </span></span>
<span class="line"><span> svn commit -m &quot;Staging apache-nuttx-12.1.0-RC0&quot;</span></span></code></pre></div><p>Verify the release exists under <a href="https://dist.apache.org/repos/dist/dev/nuttx/" target="_blank" rel="noreferrer">https://dist.apache.org/repos/dist/dev/nuttx/</a></p><h2 id="call-for-a-community-vote" tabindex="-1">Call for a Community Vote <a class="header-anchor" href="#call-for-a-community-vote" aria-label="Permalink to &quot;Call for a Community Vote&quot;">​</a></h2><p>To do this send an email that looks something like this:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Subject: [VOTE] Apache NuttX 12.1.0 RC0 release</span></span>
<span class="line"><span>To: dev@nuttx.apache.org</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Hello all,</span></span>
<span class="line"><span>Apache NuttX 12.1.0 RC0 has been staged under [1] and it&#39;s</span></span>
<span class="line"><span>time to vote on accepting it for release. If approved we will seek</span></span>
<span class="line"><span>final release approval from the IPMC. Voting will be open for 72hr.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>A minimum of 3 binding +1 votes and more binding +1 than binding -1 are</span></span>
<span class="line"><span>required to pass.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>The Apache requirements for approving a release can be found here [3]</span></span>
<span class="line"><span>&quot;Before voting +1 [P]PMC members are required to download the signed</span></span>
<span class="line"><span>source code package, compile it as provided, and test the resulting</span></span>
<span class="line"><span>executable on their own platform, along with also verifying that the</span></span>
<span class="line"><span>package meets the requirements of the ASF policy on releases.&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>A document to walk through some of this process has been published on</span></span>
<span class="line"><span>our project wiki and can be found here [4].</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ ] +1 accept (indicate what you validated - e.g. performed the non-RM</span></span>
<span class="line"><span>items in [4])</span></span>
<span class="line"><span>[ ] -1 reject (explanation required)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Thank you all,</span></span>
<span class="line"><span>&lt;Release Manager&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>SCM Information:</span></span>
<span class="line"><span>  Release tag: nuttx-12.1.0-RC0</span></span>
<span class="line"><span>  Hash for the release nuttx tag: &lt;GIT HASH&gt;</span></span>
<span class="line"><span>  Hash for the release nuttx-apps tag: &lt;GIT HASH&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[1] https://dist.apache.org/repos/dist/dev/nuttx/12.1.0-RC0/</span></span>
<span class="line"><span>[2] https://raw.githubusercontent.com/apache/nuttx/nuttx-12.1.0-RC0/ReleaseNotes</span></span>
<span class="line"><span>[3] https://www.apache.org/dev/release.html#approving-a-release</span></span>
<span class="line"><span>[4] https://cwiki.apache.org/confluence/display/NUTTX/Validating+a+staged+Release</span></span></code></pre></div><p>After the voting requirements have been met (see the email text) the release an email is sent closing out the voting.</p><p>Example text for that email is here. Note you will have to fill in the vote count and an archive link to the voting thread. The best way to find the link is here <a href="https://lists.apache.org/list.html?dev@nuttx.apache.org" target="_blank" rel="noreferrer">https://lists.apache.org/list.html?dev@nuttx.apache.org</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Subject: [RESULTS][VOTE] Release Apache NuttX 12.1.0 [RC0]</span></span>
<span class="line"><span>To: dev@nuttx.apache.org</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Hi all,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>The vote to release Apache NuttX 12.1.0-rc0 is now closed.</span></span>
<span class="line"><span>Thanks to those that took the time to review and vote.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>The release has passed with 4 +1 (binding) votes and no 0 or -1 votes.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Binding:</span></span>
<span class="line"><span>+1 Lup Yuen Lee</span></span>
<span class="line"><span>+1 Roberto Bucher</span></span>
<span class="line"><span>+1 Tomek CEDRO</span></span>
<span class="line"><span>+1 Alin Jerpelea</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Non binding</span></span>
<span class="line"><span>+1 Filipe Cavalcanti</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Vote thread</span></span>
<span class="line"><span>https://lists.apache.org/thread.html/r75faed90e03c7e7a07ff79988bb0586eec224905144f34e99333e9cd%40%3Cgeneral..apache.org%3E</span></span>
<span class="line"><span></span></span>
<span class="line"><span>We will proceed with the official release of 12.1.0.</span></span></code></pre></div><p>If the vote does not pass bring the feedback to the community and start the release process again with a new RC.</p><h2 id="staging-the-release" tabindex="-1">Staging the release <a class="header-anchor" href="#staging-the-release" aria-label="Permalink to &quot;Staging the release&quot;">​</a></h2><p>With the release approved you can now copy the release artifacts to the release repository. Note it no longer has an RC in the folder name.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~/nuttx/svn </span></span>
<span class="line"><span> cp -r nuttx-dev/12.1.0-RC0 nuttx-release/12.1.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>~/nuttx/svn </span></span>
<span class="line"><span> cd nuttx-release/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>~/nuttx/svn/nuttx-release </span></span>
<span class="line"><span> svn status</span></span>
<span class="line"><span>?       12.1.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>~/nuttx/svn/nuttx-release </span></span>
<span class="line"><span> svn add 12.1.0</span></span>
<span class="line"><span>A         12.1.0</span></span>
<span class="line"><span>A  (bin)  12.1.0/apache-nuttx-12.1.0.tar.gz</span></span>
<span class="line"><span>A  (bin)  12.1.0/apache-nuttx-apps-12.1.0.tar.gz</span></span>
<span class="line"><span>A         12.1.0/apache-nuttx-12.1.0.tar.gz.sha512</span></span>
<span class="line"><span>A         12.1.0/apache-nuttx-apps-12.1.0.tar.gz.sha512</span></span>
<span class="line"><span>A  (bin)  12.1.0/apache-nuttx-12.1.0.tar.gz.asc</span></span>
<span class="line"><span>A  (bin)  12.1.0/apache-nuttx-apps-12.1.0.tar.gz.asc</span></span>
<span class="line"><span> svn commit -m &quot;Releasing apache-nuttx-12.1.0&quot;</span></span></code></pre></div><p>At this point you should see the release at <a href="https://dist.apache.org/repos/dist/release/nuttx/" target="_blank" rel="noreferrer">https://dist.apache.org/repos/dist/release/nuttx/</a></p><h2 id="create-release-tags" tabindex="-1">Create release tags <a class="header-anchor" href="#create-release-tags" aria-label="Permalink to &quot;Create release tags&quot;">​</a></h2><p>Create non RC tags the same way it was done for the RC tags on both repositories:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Export the signing key</span></span>
<span class="line"><span> export GPG_TTY=(tty)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>~/nuttx/wrk/nuttx on  releases/12.1 [] </span></span>
<span class="line"><span> git checkout releases/12.1</span></span>
<span class="line"><span>Already on &#39;releases/12.1&#39;</span></span>
<span class="line"><span>Your branch is up to date with &#39;origin/releases/12.1&#39;.</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Make sure it is up-to-date with upstream</span></span>
<span class="line"><span>~/nuttx/wrk/nuttx on  releases/12.1 [] </span></span>
<span class="line"><span> git pull</span></span>
<span class="line"><span>Already up to date.</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Make create the signed tag (note the -s option)</span></span>
<span class="line"><span>~/nuttx/wrk/nuttx on  releases/12.1 [] </span></span>
<span class="line"><span> git tag -s nuttx-12.1.0 -m nuttx-12.1.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Check that botht the RC and non RC tags exist on the commit</span></span>
<span class="line"><span>~/nuttx/wrk/release/nuttx on  releases/12.1 [] took 4s </span></span>
<span class="line"><span> git log -n 1</span></span>
<span class="line"><span>commit 16748108c503d762779545d40113825e54b75252 (HEAD -&gt; releases/12.1, tag: nuttx-12.1.0-RC0, tag: nuttx-12.1.0, origin/releases/12.1)</span></span>
<span class="line"><span>Author: Dong Heng &lt;dongheng@espressif.com&gt;</span></span>
<span class="line"><span>Date:   Fri Apr 9 20:03:24 2021 +0800</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    riscv/esp32c3: Fix heap end address</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Push the tag</span></span>
<span class="line"><span>~/nuttx/wrk/release/nuttx on  releases/12.1 [] </span></span>
<span class="line"><span>  git push -u origin nuttx-12.1.0</span></span>
<span class="line"><span>Enumerating objects: 1, done.</span></span>
<span class="line"><span>Counting objects: 100% (1/1), done.</span></span>
<span class="line"><span>Writing objects: 100% (1/1), 805 bytes | 402.00 KiB/s, done.</span></span>
<span class="line"><span>Total 1 (delta 0), reused 0 (delta 0), pack-reused 0</span></span>
<span class="line"><span>To github.com:apache/nuttx.git</span></span>
<span class="line"><span> * [new tag]               nuttx-12.1.0 -&gt; nuttx-12.1.0</span></span></code></pre></div><p>You should be able to see the tag here <a href="https://github.com/apache/nuttx/tags" target="_blank" rel="noreferrer">https://github.com/apache/nuttx/tags</a> and <a href="https://github.com/apache/nuttx-apps/tags" target="_blank" rel="noreferrer">https://github.com/apache/nuttx-apps/tags</a></p><h2 id="create-a-pr-to-add-the-release-to-the-website" tabindex="-1">Create a PR to add the Release to the Website <a class="header-anchor" href="#create-a-pr-to-add-the-release-to-the-website" aria-label="Permalink to &quot;Create a PR to add the Release to the Website&quot;">​</a></h2><p>This should include the release notes and also the metadata for downloading the release. An example of this is here apache/nuttx-website#39 After 48hrs from committing to the release SVN the distribution mirrors should have synced and this can now be merged.</p><p>10min or so after the merge you should see the release here <a href="https://nuttx.apache.org/download/" target="_blank" rel="noreferrer">https://nuttx.apache.org/download/</a></p><h2 id="send-the-release-email-out" tabindex="-1">Send the release email out <a class="header-anchor" href="#send-the-release-email-out" aria-label="Permalink to &quot;Send the release email out&quot;">​</a></h2><p>Once the website shows the release you can now send the release announcement out. Here is an example of that email. Note we must wait 48hr after the SVN commit before sending this.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Subject: [ANNOUNCE] Apache NuttX 12.1.0 released</span></span>
<span class="line"><span>To: dev@nuttx.apache.org</span></span>
<span class="line"><span></span></span>
<span class="line"><span>The Apache NuttX project team is proud to announce</span></span>
<span class="line"><span>Apache NuttX 12.1.0 has been released.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>The release artifacts and Release Notes can be found at:</span></span>
<span class="line"><span>https://nuttx.apache.org/download/</span></span>
<span class="line"><span>https://nuttx.apache.org/releases/12.1.0/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Thanks,</span></span>
<span class="line"><span>&lt;Release Manager&gt;</span></span>
<span class="line"><span>on behalf of Apache NuttX PPMC</span></span></code></pre></div>`,61)]))}const d=s(t,[["render",l]]);export{g as __pageData,d as default};
