
partial class usercontrols_js
    inherits system.web.ui.usercontrol
    protected sub page_load(sender as object, e as eventargs) handles me.load
        Dim currentUrl As String = Request.Url.AbsoluteUri
        if request.path = "/" OR currentUrl.ToLower().Contains("home") then
            if (configurationmanager.appsettings("updatechannel") = "Beta") or (configurationmanager.appsettings("updatechannel") = "beta") then
                productionhomepage.visible = false
                developmenthomepage.visible = true
            else
                productionhomepage.visible = true
                developmenthomepage.visible = false
            end if
        else
            if (configurationmanager.appsettings("updatechannel") = "Beta") or (configurationmanager.appsettings("updatechannel") = "beta") then
                productionsubpage.visible = false
                developmentsubpage.visible = true
            else
                productionsubpage.visible = true
                developmentsubpage.visible = false
            end if
        end if

    end sub
end class
