WAT_OUT = public/.html
HEADING="FinRates!"
include wat/Makefile

.PHONY: up build clean serve watch deploy run ssh
.DEFAULT_GOAL=build

up: waup
build: wa
clean: waclean
watch: wawatch
