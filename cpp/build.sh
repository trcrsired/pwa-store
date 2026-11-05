#!/bin/sh
# Build store.wasm: the packed-catalogue engine for docs/store/store.bin.
#
# Freestanding by design - no libc, no allocation, no floating point - so the
# module imports nothing at all and the JS side only has to memcpy the fetched
# bytes into the exported buffer.
set -e
: "${FAST_IO:=/home/cqwrteur/libraries/fast_io}"
: "${CFG:=$HOME/cfgs/wasm32-wasip1-noeh-nomtg.cfg}"

clang++ --config "$CFG" -O2 -flto=thin \
	-I "$FAST_IO/include" \
	-nostdlib \
	-Wl,--no-entry \
	-Wl,--strip-all \
	-Wl,--export=pwa_store_bin_ptr \
	-Wl,--export=pwa_store_bin_capacity \
	-Wl,--export=pwa_store_load \
	-Wl,--export=pwa_store_loaded_bytes \
	-Wl,--export=pwa_store_counts \
	-Wl,--export=pwa_store_query_ptr \
	-Wl,--export=pwa_store_query_capacity \
	-Wl,--export=pwa_store_query \
	-Wl,--export=pwa_store_match_count \
	-Wl,--export=pwa_store_match \
	-Wl,--export=pwa_store_field \
	-Wl,--export=pwa_store_app_flags \
	-Wl,--export=pwa_store_app_category \
	-Wl,--export=pwa_store_category_name \
	-Wl,--export=pwa_store_category_flags \
	-Wl,--export=pwa_store_category_span \
	store.cpp -o store.wasm

ls -l store.wasm
