imports lrswstools
partial class themes_THEME-NAME_templates_subpage
    inherits basemaster

    protected sub page_init(byval sender as object, byval e as system.eventargs) handles me.init

        if configurationmanager.appsettings("sslon") = "1" then
            me.requiressl = true
        else
            me.requiressl = false
        end if

    end sub
end class

