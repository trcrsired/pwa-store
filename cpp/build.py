#!/usr/bin/env python3
import os
import subprocess
import sys
from pathlib import Path
import shutil

# ------------------------------------------------------------
# Locales (single source of truth)
# ------------------------------------------------------------
LOCALES = ["enus", "zhcn"]

# ------------------------------------------------------------
# Resolve HOME on all platforms
# ------------------------------------------------------------
home = Path(os.environ.get("HOME") or os.environ.get("USERPROFILE"))
if not home:
    print("Could not determine HOME or USERPROFILE")
    sys.exit(1)

CFG = home / "cfgs" / "wasm32-wasip1-noeh-nomtg.cfg"
FAST_IO_DIR = home / "libraries" / "fast_io"

CXX = "clang++"

CXXFLAGS = [
    f"--config={CFG}",
    "-std=c++26",
    "-O3",
    "-flto=thin",
]

LDFLAGS = [
    f"--config={CFG}",
    "-std=c++26",
    "-O3",
    "-flto=thin",
    "-fuse-ld=lld",
    "-s",
    "-nostartfiles",
    "-Wl,--no-entry",
    "-Wl,--export=__wasm_call_ctors",
    "-Wl,--export=__wasm_call_dtors",
    "-Wl,--export=resize_search_text",
    "-Wl,--export=generate_dom",
    "-Wl,--export=get_generated_dom_data",
    "-Wl,--export=get_generated_dom_size",
    "-Wl,--export=get_last_found_entries_count"
]

# ------------------------------------------------------------
# Helper: run a command and stop on failure
# ------------------------------------------------------------
def run(cmd):
    print(" ".join(str(x) for x in cmd))
    try:
        subprocess.check_call(cmd)
    except subprocess.CalledProcessError:
        print("\nBUILD FAILED.")
        sys.exit(1)

# ------------------------------------------------------------
# Build fast_io.pcm
# ------------------------------------------------------------
fast_io_pcm = None
fast_io_cppm = FAST_IO_DIR / "share" / "fast_io" / "fast_io.cppm"

# ------------------------------------------------------------
# Function to build a locale
# ------------------------------------------------------------
def build_locale(locale: str):
    pcm = Path(f"{locale}.pcm")
    wasm = Path(f"{locale}.wasm")

    # Precompile module
    run([CXX, f"{locale}.cppm"] + CXXFLAGS + ["--precompile", "-o", str(pcm)])

    # Link final wasm
    cmd = [CXX, "export.cpp"] + LDFLAGS + [
        f"-fmodule-file=pwa_store={pcm}",
    ]

    if fast_io_pcm:
        cmd.append(f"-fmodule-file=fast_io={fast_io_pcm}")

    cmd += ["-o", str(wasm)]

    run(cmd)

# ------------------------------------------------------------
# Install function
# ------------------------------------------------------------
def install(dest: Path):
    dest.mkdir(parents=True, exist_ok=True)

    for locale in LOCALES:
        wasm = Path(f"{locale}.wasm")
        if not wasm.exists():
            print(f"Error: {wasm} does not exist. Build first.")
            sys.exit(1)

        shutil.copy2(wasm, dest / wasm.name)
        print(f"Installed {wasm} → {dest / wasm.name}")

# ------------------------------------------------------------
# Cleanup intermediate PCM files
# ------------------------------------------------------------
def cleanup_pcm():
    for f in ["fast_io.pcm"] + [f"{loc}.pcm" for loc in LOCALES]:
        p = Path(f)
        if p.exists():
            try:
                p.unlink()
                print(f"Removed {p}")
            except Exception as e:
                print(f"Warning: could not remove {p}: {e}")

# ------------------------------------------------------------
# Clean wasm files
# ------------------------------------------------------------
def clean():
    for locale in LOCALES:
        wasm = Path(f"{locale}.wasm")
        if wasm.exists():
            try:
                wasm.unlink()
                print(f"Removed {wasm}")
            except Exception as e:
                print(f"Warning: could not remove {wasm}: {e}")

# ------------------------------------------------------------
# Main
# ------------------------------------------------------------
if len(sys.argv) >= 2:
    cmd = sys.argv[1]

    if cmd == "install":
        if len(sys.argv) < 3:
            print("Usage: python build.py install <path>")
            sys.exit(1)
        install(Path(sys.argv[2]))
        sys.exit(0)

    if cmd == "clean":
        clean()
        cleanup_pcm()
        sys.exit(0)

if fast_io_cppm.exists():
    fast_io_pcm = Path("fast_io.pcm")
    run([CXX, str(fast_io_cppm)] + CXXFLAGS + ["--precompile", "-o", str(fast_io_pcm)])
else:
    print("fast_io not found, skipping fast_io.pcm")

# Default: build everything
for loc in LOCALES:
    build_locale(loc)

cleanup_pcm()

print("Build complete.")
