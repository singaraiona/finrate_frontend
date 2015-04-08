
# include this Makefile into your project's one to use some useful wat targets
empty =
space = $(empty) $(empty)

# report to stderr and exit with non-zero code
define die
(echo $1 && exit 5)
endef

# ensure next files/dirs/links are exist
define require
(ls $1 > /dev/null 2>&1) || $(call die,$2)
endef

# ensure given bins are in the PATH
define ensure
(which $1 > /dev/null 2>&1) || $(call die,$2)
endef

define checkme
$(call require, node_modules, \
	"NPM distribution is not installed. Do 'make waup' before.")
endef

# extend PATH so we can call local npm clis directly
export PATH := $(CURDIR)/node_modules/.bin:$(PATH)

# conditionally include .env file (foreman's Procfile env)
-include .env

# if tmpdir not set, use local one
TMPDIR ?= .tmp

# wat mountpoint (git submodule dir related to make's pwd)
WAT ?= wat

# compiled app destination
WAT_OUT ?= .html

# user interfase source code root dir
WAT_SRC ?= src

# additional npm modules to grab
WAT_3RD ?=

# app scripts footprint (3rd party libs)
WAT_INC ?=
WAT_INC := $(WAT_INC) \
	react/dist/react-with-addons.js \
	mousetrap/mousetrap.min.js
WAT_INC := $(patsubst %,node_modules/%,$(WAT_INC))

# app favicon file (should be an .ico file, not .png)
WAT_ICO ?= $(WAT)/Iconfile

# wawatch exec command
WAT_WEC ?= wa

# phony targets
.PHONY: wa waup waclean wawatch
wa: $(WAT_OUT)
	@ rm $(WAT_OUT).*
waup:
	@ $(call ensure,npm$(space)node,"node/npm should be installed systemwide.")
	@ npm install --force $(WAT_3RD) \
		nodemon@1.3.7 \
		typescript@1.4.1 \
		stylus@0.50.0 \
		react@0.13.1 \
		mousetrap@1.4.6 \
		socket.io@1.3.5
waclean:
	@ rm -rf $(WAT_OUT) $(WAT_OUT).*
wawatch:
	@ nodemon --exec "make $(WAT_WEC) || :" -w $(WAT_SRC) -w $(WAT) -e jsx,ts,styl,svg,woff,html,js,css -q -d 0

$(WAT_OUT): $(WAT_OUT).js
	@ mkdir -p $(@D)
	@ rm -f $@ && touch $@
	@ echo -e "<!DOCTYPE html PUBLIC\"-//W3C//DTD XHTML 1.0 Strict//EN\"" \
		"\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">" \
		"<html xmlns=\"http://www.w3.org/1999/xhtml\">" \
		"<head><meta http-equiv=\"content-type\"" \
		"content=\"text/html; charset=utf-8\" />" \
		"<title>$(HEADING)</title></head>" > $@
	@ cat $(WAT_SRC)/*.inc >> $@
	@ printf "<script>" >> $@
	@ cat $@.js >> $@
	@ printf "</script>\n" >> $@
	@ echo -e "<body></body></html>" >> $@ 
	@ echo $@ rebuilded.

$(WAT_OUT).js:
	@ for fl in $(WAT_SRC)/*.js ; do \
      	java -jar $(WAT)/yuicompressor.jar --type js $$fl >> $@ ; \
	  done
