<style>
.sharing-buttons {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style-type: none;
  font-size: 20px;
  font-size: 1.25rem;
  line-height: 20px;
  line-height: 1.25rem;
  text-align: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center
}

.sharing-buttons li {
  display: inline-block
}

.sharing-buttons a {
  display: none;
  margin: 0 .3125rem .3125rem;
  padding: .3125rem .75rem;
  color: #fff;
  background: #000;
  border-radius: .3125rem;
  text-decoration: none
}

.sharing-buttons.facebook a.facebook,
.sharing-buttons.google a.google,
.sharing-buttons.linkedin a.linkedin,
.sharing-buttons.twitter a.twitter,
.sharing-buttons.xing a.xing,
.sharing-buttons.email a.email {
  display: block
}

.sharing-buttons .label {
  display: inline-block;
  position: relative;
  top: -2px;
  top: -.125rem;
  margin-left: .375rem;
  font-size: 16px;
  font-size: 1rem;
  line-height: 16px;
  line-height: 1rem
}

.sharing-buttons a.facebook,
.sharing-buttons a.facebook:visited {
  background: #3b5998
}

.sharing-buttons a.twitter,
.sharing-buttons a.twitter:visited {
  background: #55acee
}

.sharing-buttons a.google,
.sharing-buttons a.google:visited {
  background: #dc4e41
}

.sharing-buttons a.linkedin,
.sharing-buttons a.linkedin:visited {
  background: #0077b5
}

.sharing-buttons a.xing,
.sharing-buttons a.xing:visited {
  background: #126567
}

.sharing-buttons a.email,
.sharing-buttons a.email:visited {
  cursor: pointer;
  background: #77ac1e
}

.sharing-buttons a:focus,
.sharing-buttons a:hover {
  color: #fff;
  background: gray
}
</style>
<ul class="sharing-buttons facebook twitter email">
  <li>
    <a class="facebook" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flrsoutputmanagement.com&t=" target="_blank" title="Share on Facebook" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL) + '&t=' + encodeURIComponent(document.URL)); return false;"><span class="fab fa-facebook-f"></span><span class="label">Facebook</span></a>
  </li><li>
    <a class="twitter" href="https://twitter.com/intent/tweet?source=http%3A%2F%2Flrsoutputmanagement.com&text=:%20http%3A%2F%2Flrsoutputmanagement.com" target="_blank" title="Share on Twitter" onclick="window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + ':%20' + encodeURIComponent(document.URL)); return false;"><span class="fab fa-twitter"></span><span class="label">Twitter</span></a>
  </li><li>
    <a class="google" href="https://plus.google.com/share?url=http%3A%2F%2Flrsoutputmanagement.com" target="_blank" title="Share on Google+" onclick="window.open('https://plus.google.com/share?url=' + encodeURIComponent(document.URL)); return false;"><span class="fab fa-google-plus-g"></span><span class="label">Google+</span></a>
  </li><li>
    <a class="linkedin" href="http://www.linkedin.com/shareArticle?mini=true&url=http%3A%2F%2Flrsoutputmanagement.com&title=&summary=&source=http%3A%2F%2Flrsoutputmanagement.com" target="_blank" title="Share on LinkedIn" onclick="window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(document.URL) + '&title=' +  encodeURIComponent(document.title)); return false;"><span class="fab fa-linkedin"></span><span class="label">LinkedIn</span></a>
  </li><li>
    <a class="xing" href="https://www.xing.com/spi/shares/new?url=source=http%3A%2F%2Flrsoutputmanagement.com" target="_blank" title="Share on Xing" onclick="window.open('https://www.xing.com/spi/shares/new?url=' + encodeURIComponent(document.URL) + '&title=' + encodeURIComponent(document.title)); return false;"><span class="fab fa-xing"></span><span class="label">Xing</span></a>
  </li><li>
    <a class="email" title="Email to a friend" onclick="javascript:window.location='mailto:?subject=An Obituary from LocalObituary.com&body=This obituary I found on LocalObituary.com may interest you: ' + window.location;">
    <span class="fas fa-envelope"></span><span class="label">Email</span>
    </a>
  </li>
</ul>

