
partial class usercontrols_css
    inherits system.web.ui.usercontrol
    protected sub page_load(sender as object, e as eventargs) handles me.load

        Dim currentUrl As String = Request.Url.AbsoluteUri
        if (configurationmanager.appsettings("updatechannel") = "Beta") or (configurationmanager.appsettings("updatechannel") = "beta") then
            ' demo

            devmain.attributes("href") = "/themes/" & antilles.theme.getthemename & "/assets/dist/css/main.css?v=" & io.file.getlastwritetime(mappath("/themes/" & antilles.theme.getthemename & "/assets/dist/css/main.css")).tostring("yyyymmddhhmmss")

            devmain.visible = true
            if request.path = "/" OR currentUrl.ToLower().Contains("home") then
                devhomepage.visible = true
                devhomepage.attributes("href") = "/themes/" & antilles.theme.getthemename & "/assets/dist/css/homepage.css?v=" & io.file.getlastwritetime(mappath("/themes/" & antilles.theme.getthemename & "/assets/dist/css/homepage.css")).tostring("yyyymmddhhmmss")
            else
                devsubpage.visible = true
                devsubpage.attributes("href") = "/themes/" & antilles.theme.getthemename & "/assets/dist/css/subpage.css?v=" & io.file.getlastwritetime(mappath("/themes/" & antilles.theme.getthemename & "/assets/dist/css/subpage.css")).tostring("yyyymmddhhmmss")
            end if
        else
            ' production
            prodmain.attributes("href") = "/themes/" & antilles.theme.getthemename & "/assets/dist/css/main.min.css?v=" & io.file.getlastwritetime(mappath("/themes/" & antilles.theme.getthemename & "/assets/dist/css/main.min.css")).tostring("yyyymmddhhmmss")

            prodmain.visible = true
            if request.path = "/" OR currentUrl.ToLower().Contains("home") then
                prodhomepage.visible = true
                prodhomepage.attributes("href") = "/themes/" & antilles.theme.getthemename & "/assets/dist/css/homepage.min.css?v=" & io.file.getlastwritetime(mappath("/themes/" & antilles.theme.getthemename & "/assets/dist/css/homepage.min.css")).tostring("yyyymmddhhmmss")
            else
                prodsubpage.visible = true
                prodsubpage.attributes("href") = "/themes/" & antilles.theme.getthemename & "/assets/dist/css/subpage.min.css?v=" & io.file.getlastwritetime(mappath("/themes/" & antilles.theme.getthemename & "/assets/dist/css/subpage.min.css")).tostring("yyyymmddhhmmss")
            end if
        end if


    end sub
end class
