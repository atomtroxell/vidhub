partial class themes_THEME-NAME_includes_header
	inherits system.web.ui.usercontrol

    protected sub page_init(byval sender as object, byval e as system.eventargs) handles me.init
      if request.path = "/" then
        brandinghp.visible = true
        brandingsp.visible = false
      else
        brandinghp.visible = false
        brandingsp.visible = true
      end if

    end sub
end class
