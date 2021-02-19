<%@ control language="vb" autoeventwireup="false" codefile="header.ascx.vb" inherits="themes_THEME-NAME_includes_header" %>
<%@ register src="/views/pages/pages-mainnavigation.ascx" tagprefix="uc1" tagname="mainnavigation" %>

<header class="primary" id="header">

  <a class="skipcontent" href="#main" tabindex="0">Skip to Main Content</a>

  <div class="branding">
    <asp:Panel ID="brandingHP" runat="server">
      <h1 class="sr-only">SITE-NAME</h1>
      <a href="/" aria-label="Go to SITE-NAME homepage"><span class="logo"></span></a>
    </asp:Panel>
    <asp:Panel ID="brandingSP" runat="server" visible="false">
      <h2 class="sr-only">SITE-NAME</h2>
      <a href="/" aria-label="Go to SITE-NAME homepage"><span class="logo"></span></a>
    </asp:Panel>
  </div>

  <nav class="nav-primary">
    <h2 class="sr-only">Main Navigation</h2>
    <uc1:mainnavigation runat="server" id="mainnavigation" />
  </nav>
</header>