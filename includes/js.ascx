<%@ Control Language="VB" AutoEventWireup="false" CodeFile="js.ascx.vb" Inherits="UserControls_JS" %>

<asp:panel ID="developmentHomepage" runat="server" visible="false">
  <script src="/themes/obs/assets/dist/js/main.js?v=<%= IO.File.GetLastWriteTime(MapPath("/themes/obs/assets/dist/js/main.js")).ToString("yyyyMMddHHmmss")%>"></script>
  <script src="/themes/obs/assets/dist/js/homepage.js?v=<%= IO.File.GetLastWriteTime(MapPath("/themes/obs/assets/dist/js/homepage.js")).ToString("yyyyMMddHHmmss")%>"></script>
</asp:panel>

<asp:panel ID="productionHomepage" runat="server" visible="false">
  <script src="/themes/obs/assets/dist/js/main.min.js?v=<%= IO.File.GetLastWriteTime(MapPath("/themes/obs/assets/dist/js/main.js")).ToString("yyyyMMddHHmmss")%>"></script>
  <script src="/themes/obs/assets/dist/js/homepage.min.js?v=<%= IO.File.GetLastWriteTime(MapPath("/themes/obs/assets/dist/js/homepage.js")).ToString("yyyyMMddHHmmss")%>"></script>
</asp:panel>

<asp:panel ID="developmentSubpage" runat="server" visible="false">
  <script src="/themes/obs/assets/dist/js/main.js?v=<%= IO.File.GetLastWriteTime(MapPath("/themes/obs/assets/dist/js/main.js")).ToString("yyyyMMddHHmmss")%>"></script>
  <script src="/themes/obs/assets/dist/js/subpage.js?v=<%= IO.File.GetLastWriteTime(MapPath("/themes/obs/assets/dist/js/homepage.js")).ToString("yyyyMMddHHmmss")%>"></script>
</asp:panel>

<asp:panel ID="productionSubpage" runat="server" visible="false">
  <script src="/themes/obs/assets/dist/js/main.min.js?v=<%= IO.File.GetLastWriteTime(MapPath("/themes/obs/assets/dist/js/main.js")).ToString("yyyyMMddHHmmss")%>"></script>
  <script src="/themes/obs/assets/dist/js/subpage.min.js?v=<%= IO.File.GetLastWriteTime(MapPath("/themes/obs/assets/dist/js/homepage.js")).ToString("yyyyMMddHHmmss")%>"></script>
</asp:panel>