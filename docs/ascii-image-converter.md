================================================
FILE: README.md
================================================

# ascii-image-converter

[![release-version](https://img.shields.io/github/v/release/TheZoraiz/ascii-image-converter?label=Latest%20Version)](https://github.com/TheZoraiz/ascii-image-converter/releases/latest)
[![license](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/TheZoraiz/ascii-image-converter/blob/master/LICENSE.txt)
[![language](https://img.shields.io/badge/Language-Go-blue)](https://golang.org/)
![release-downloads](https://img.shields.io/github/downloads/TheZoraiz/ascii-image-converter/total?color=1d872d&label=Release%20Downloads)
[![ascii-image-converter-snap](https://snapcraft.io/ascii-image-converter/badge.svg)](https://snapcraft.io/ascii-image-converter)

ascii-image-converter is a command-line tool that converts images into ascii art and prints them out onto the console. Available on Windows, Linux and macOS.

Now supports braille art!

Input formats currently supported:

- JPEG/JPG
- PNG
- BMP
- WEBP
- TIFF/TIF
- GIF

<p align="center">
  <img src="https://raw.githubusercontent.com/TheZoraiz/ascii-image-converter/master/example_gifs/all.gif">
</p>

## Table of Contents

- [Installation](#installation)
  - [Debian / Ubuntu-based](#debian-or-ubuntu-based-distros)
  - [Homebrew](#homebrew)
  - [AUR](#aur)
  - [Scoop](#scoop)
  - [Snap](#snap)
  - [Go](#go)
  - [Linux (binaries)](#linux)
  - [Windows (binaries)](#windows)
- [CLI Usage](#cli-usage)
  - [Flags](#flags)
- [Library Usage](#library-usage)
- [Contributing](#contributing)
- [Packages Used](#packages-used)
- [License](#license)

## Installation

### Debian or Ubuntu-based Distros

Execute the following commands in order:

```
echo 'deb [trusted=yes] https://apt.fury.io/ascii-image-converter/ /' | sudo tee /etc/apt/sources.list.d/ascii-image-converter.list
```

```
sudo apt update
```

```
sudo apt install -y ascii-image-converter
```

<br>

To remove the package source (which means you won't be getting any further updates), execute this command:

```
sudo rm -v /etc/apt/sources.list.d/ascii-image-converter.list
```

<hr>

### Homebrew

Installation with homebrew is available for both Linux and macOS.

```
brew install TheZoraiz/ascii-image-converter/ascii-image-converter
```

[Link to homebrew repository](https://github.com/TheZoraiz/homebrew-ascii-image-converter)

<hr>

### AUR

The AUR repo is maintained by [magnus-tesshu](https://aur.archlinux.org/account/magnus-tesshu)

Standard way:

```
git clone https://aur.archlinux.org/ascii-image-converter-git.git
```

```
cd ascii-image-converter-git/
```

```
makepkg -si
```

AUR helper:

```
<aur-helper> -S ascii-image-converter-git
```

<hr>

### Scoop

The scoop manifest is maintained by [brian6932](https://github.com/brian6932)

```
scoop install ascii-image-converter
```

<hr>

### Snap

> **Note:** The snap will not have access to hidden files and files outside the $HOME directory. This includes write access for saving ascii art as well.

```
sudo snap install ascii-image-converter
```

Visit [the app's snap store listing](https://snapcraft.io/ascii-image-converter) for instructions regarding enabling snapd on your distribution.

[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/ascii-image-converter)

<hr>

### Go

```
go install github.com/TheZoraiz/ascii-image-converter@latest
```

<hr>

For physically installing the binaries, follow the steps with respect to your OS.

### Linux

Download the archive for your distribution's architecture [here](https://github.com/TheZoraiz/ascii-image-converter/releases/latest), extract it, and open the extracted directory.

Now, open a terminal in the same directory and execute this command:

```
sudo cp ascii-image-converter /usr/local/bin/
```

Now you can use ascii-image-converter in the terminal. Execute `ascii-image-converter -h` for more details.

### Windows

You will need to set an Environment Variable to the folder the ascii-image-converter.exe executable is placed in to be able to use it in the command prompt. Follow the instructions in case of confusion:

Download the archive for your Windows architecture [here](https://github.com/TheZoraiz/ascii-image-converter/releases/latest), extract it, and open the extracted folder. Now, copy the folder path from the top of the file explorer and follow these instructions:

- In Search, search for and then select: Advanced System Settings
- Click Environment Variables. In the section User Variables find the Path environment variable and select it. Click "Edit".
- In the Edit Environment Variable window, click "New" and then paste the path of the folder that you copied initially.
- Click "Ok" on all open windows.

Now, restart any open command prompt and execute `ascii-image-converter -h` for more details.

<br>

## CLI Usage

> **Note:** Decrease font size or increase terminal width (like zooming out) for maximum quality ascii art

The basic usage for converting an image into ascii art is as follows. You can also supply multiple image paths and urls as well as a GIF.

```
ascii-image-converter [image paths/urls]
```

Example:

```
ascii-image-converter myImage.jpeg
```

> **Note:** Piped binary input is also supported
>
> ```
> cat myImage.png | ascii-image-converter -
> ```

### Flags

#### --color OR -C

> **Note:** Your terminal must support 24-bit or 8-bit colors for appropriate results. If 24-bit colors aren't supported, 8-bit color escape codes will be used

Display ascii art with the colors from original image.

```
ascii-image-converter [image paths/urls] -C
# Or
ascii-image-converter [image paths/urls] --color
```

<p align="center">
  <img src="https://raw.githubusercontent.com/TheZoraiz/ascii-image-converter/master/example_gifs/color.gif">
</p>

#### --braille OR -b

> **Note:** Braille pattern display heavily depends on which terminal or font you're using. In windows, try changing the font from command prompt properties if braille characters don't display

Use braille characters instead of ascii. For this flag, your terminal must support braille patters (UTF-8) properly. Otherwise, you may encounter problems with colored or even uncolored braille art.

```
ascii-image-converter [image paths/urls] -b
# Or
ascii-image-converter [image paths/urls] --braille
```

<p align="center">
  <img src="https://raw.githubusercontent.com/TheZoraiz/ascii-image-converter/master/example_gifs/braille.gif">
</p>

#### --threshold

Set threshold value to compare for braille art when converting each pixel into a dot. Value must be between 0 and 255.

Example:

```
ascii-image-converter [image paths/urls] -b --threshold 170
```

#### --dither

Apply dithering on image to make braille art more visible. Since braille dots can only be on or off, dithering images makes them more visible in braille art.

Example:

```
ascii-image-converter [image paths/urls] -b --dither
```

<p align="center">
  <img src="https://raw.githubusercontent.com/TheZoraiz/ascii-image-converter/master/example_gifs/dither.gif">
</p>

#### --color-bg

If any of the coloring flags is passed, this flag will transfer its color to each character's background. instead of foreground. However, this option isn't available for `--save-img` and `--save-gif`

```
ascii-image-converter [image paths/urls] -C --color-bg
```

#### --dimensions OR -d

> **Note:** Don't immediately append another flag with -d

Set the width and height for ascii art in CHARACTER lengths.

```
ascii-image-converter [image paths/urls] -d <width>,<height>
# Or
ascii-image-converter [image paths/urls] --dimensions <width>,<height>
```

Example:

```
ascii-image-converter [image paths/urls] -d 60,30
```

<p align="center">
  <img src="https://raw.githubusercontent.com/TheZoraiz/ascii-image-converter/master/example_gifs/dimensions.gif">
</p>

#### --width OR -W

> **Note:** Don't immediately append another flag with -W

Set width of ascii art. Height is calculated according to aspect ratio.

```
ascii-image-converter [image paths/urls] -W <width>
# Or
ascii-image-converter [image paths/urls] --width <width>
```

Example:

```
ascii-image-converter [image paths/urls] -W 60
```

#### --height OR -H

> **Note:** Don't immediately append another flag with -H

Set height of ascii art. Width is calculated according to aspect ratio.

```
ascii-image-converter [image paths/urls] -H <height>
# Or
ascii-image-converter [image paths/urls] --height <height>
```

Example:

```
ascii-image-converter [image paths/urls] -H 60
```

#### --map OR -m

> **Note:** Don't immediately append another flag with -m

Pass a string of your own ascii characters to map against. Passed characters must start from darkest character and end with lightest. There is no limit to number of characters.

Empty spaces can be passed if string is passed inside quotation marks. You can use both single or double quote for quotation marks. For repeating quotation mark inside string, append it with \ (such as \\").

```
ascii-image-converter [image paths/urls] -m "<string-of-characters>"
# Or
ascii-image-converter [image paths/urls] --map "<string-of-characters>"
```

Following example contains 7 depths of lighting.

```
ascii-image-converter [image paths/urls] -m " .-=+#@"
```

<p align="center">
  <img src="https://raw.githubusercontent.com/TheZoraiz/ascii-image-converter/master/example_gifs/map.gif">
</p>

#### --grayscale OR -g

Display ascii art in grayscale colors. This is the same as --color flag, except each character will be encoded with a grayscale RGB value.

```
ascii-image-converter [image paths/urls] -g
# Or
ascii-image-converter [image paths/urls] --grayscale
```

#### --negative OR -n

Display ascii art in negative colors. Works with both uncolored and colored text from --color flag.

```
ascii-image-converter [image paths/urls] -n
# Or
ascii-image-converter [image paths/urls] --negative
```

<p align="center">
  <img src="https://raw.githubusercontent.com/TheZoraiz/ascii-image-converter/master/example_gifs/negative.gif">
</p>

#### --complex OR -c

Print the image with a wider array of ascii characters for more detailed lighting density. Sometimes improves accuracy.

```
ascii-image-converter [image paths/urls] -c
# Or
ascii-image-converter [image paths/urls] --complex
```

#### --full OR -f

Print ascii art that fits the terminal width while maintaining aspect ratio.

```
ascii-image-converter [image paths/urls] -f
# Or
ascii-image-converter [image paths/urls] --full
```

#### --flipX OR -x

Flip the ascii art horizontally on the terminal.

```
ascii-image-converter [image paths/urls] --flipX
# Or
ascii-image-converter [image paths/urls] -x
```

#### --flipY OR -y

Flip the ascii art vertically on the terminal.

```
ascii-image-converter [image paths/urls] --flipY
# Or
ascii-image-converter [image paths/urls] -y
```

#### --save-img OR -s

> **Note:** Don't immediately append another flag with -s

Saves the ascii as a PNG image with the name `<image-name>-ascii-art.png` in the directory path passed to the flag. Can work with both --color and --negative flag.

Example for current directory:

```
ascii-image-converter [image paths/urls] --save-img .
# Or
ascii-image-converter [image paths/urls] -s .
```

#### --save-txt

Similar to --save-img but it creates a TXT file with the name `<image-name>-ascii-art.txt` in the directory path passed to the flag. Only saves uncolored text.

Example for current directory:

```
ascii-image-converter [image paths/urls] --save-txt .
```

#### --save-gif

> **Note:** This is an experimental feature and may not result in the finest quality GIFs, because all GIFs still aren't supported by ascii-image-converter.

Saves the passed GIF as an ascii art GIF with the name `<image-name>-ascii-art.gif` in the directory path passed to the flag.

<p align="center">
  <img src="https://raw.githubusercontent.com/TheZoraiz/ascii-image-converter/master/example_gifs/save.gif">
</p>

#### --save-bg

> **Note:** This flag will be ignored if `--save-img` or `--save-gif` flags are not set

This flag takes an RGBA value that sets the background color in saved png and gif files. The fourth value (alpha value) is the measure of background opacity ranging between 0 and 100.

```
ascii-image-converter [image paths/urls] -s . --save-bg 255,255,255,100 # For white background
```

#### --font

> **Note:** This flag will be ignored if `--save-img` or `--save-gif` flags are not set

This flag takes path to a font .ttf file that will be used to set font in saved png or gif files.

```
ascii-image-converter [image paths/urls] -s . --font /path/to/font-file.ttf
```

#### --font-color

This flag takes an RGB value that sets the font color in saved png and gif files as well as displayed ascii art in terminal.

```
ascii-image-converter [image paths/urls] -s . --font-color 0,0,0 # For black font color
```

#### --only-save

Don't print ascii art on the terminal if some saving flag is passed.

```
ascii-image-converter [image paths/urls] -s . --only-save
```

#### --formats

Display supported input formats.

```
ascii-image-converter --formats
```

<br>

## Library Usage

> **Note:** The library may throw errors during Go tests due to some unresolved bugs with the [consolesize-go](https://github.com/nathan-fiscaletti/consolesize-go) package (Only during tests, not main program execution).

First, install the library with:

```
go get -u github.com/TheZoraiz/ascii-image-converter/aic_package
```

For an image:

```go
package main

import (
	"fmt"

	"github.com/TheZoraiz/ascii-image-converter/aic_package"
)

func main() {
	// If file is in current directory. This can also be a URL to an image or gif.
	filePath := "myImage.jpeg"

	flags := aic_package.DefaultFlags()

	// This part is optional.
	// You can directly pass default flags variable to aic_package.Convert() if you wish.
	// There are more flags, but these are the ones shown for demonstration
	flags.Dimensions = []int{50, 25}
	flags.Colored = true
	flags.SaveTxtPath = "."
	flags.SaveImagePath = "."
	flags.CustomMap = " .-=+#@"
	flags.FontFilePath = "./RobotoMono-Regular.ttf" // If file is in current directory
	flags.SaveBackgroundColor = [4]int{50, 50, 50, 100}

	// Note: For environments where a terminal isn't available (such as web servers), you MUST
	// specify atleast one of flags.Width, flags.Height or flags.Dimensions

	// Conversion for an image
	asciiArt, err := aic_package.Convert(filePath, flags)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Printf("%v\n", asciiArt)
}
```

<br>

> **Note:** GIF conversion is not advised as the function may run infinitely, depending on the GIF. More work needs to be done on this to make it more library-compatible.

For a GIF:

```go
package main

import (
	"fmt"

	"github.com/TheZoraiz/ascii-image-converter/aic_package"
)

func main() {
	filePath = "myGif.gif"

	flags := aic_package.DefaultFlags()

	_, err := aic_package.Convert(filePath, flags)
	if err != nil {
		fmt.Println(err)
	}
}

```

<br>

## Contributing

You can fork the project and implement any changes you want for a pull request. However, for major changes, please open an issue first to discuss what you would like to implement.

## Packages Used

[github.com/spf13/cobra](https://github.com/spf13/cobra)

[github.com/fogleman/gg](https://github.com/fogleman/gg)

[github.com/mitchellh/go-homedir](https://github.com/mitchellh/go-homedir)

[github.com/nathan-fiscaletti/consolesize-go](https://github.com/nathan-fiscaletti/consolesize-go)

[github.com/disintegration/imaging](https://github.com/disintegration/imaging)

[github.com/gookit/color](https://github.com/gookit/color)

[github.com/makeworld-the-better-one/dither](https://github.com/makeworld-the-better-one/dither)

## License

[Apache-2.0](https://github.com/TheZoraiz/ascii-image-converter/blob/master/LICENSE.txt)

================================================
FILE: go.mod
================================================
module github.com/TheZoraiz/ascii-image-converter

go 1.17

require (
github.com/disintegration/imaging v1.6.2
github.com/fogleman/gg v1.3.0
github.com/golang/freetype v0.0.0-20170609003504-e2365dfdc4a0
github.com/gookit/color v1.4.2
github.com/makeworld-the-better-one/dither/v2 v2.2.0
github.com/mitchellh/go-homedir v1.1.0
github.com/nathan-fiscaletti/consolesize-go v0.0.0-20210105204122-a87d9f614b9d
github.com/spf13/cobra v1.1.3
github.com/spf13/viper v1.7.1
golang.org/x/image v0.0.0-20210628002857-a66eb6448b8d
)

require (
github.com/fsnotify/fsnotify v1.4.9 // indirect
github.com/hashicorp/hcl v1.0.0 // indirect
github.com/inconshreveable/mousetrap v1.0.0 // indirect
github.com/magiconair/properties v1.8.5 // indirect
github.com/mitchellh/mapstructure v1.4.1 // indirect
github.com/pelletier/go-toml v1.9.1 // indirect
github.com/spf13/afero v1.6.0 // indirect
github.com/spf13/cast v1.3.1 // indirect
github.com/spf13/jwalterweatherman v1.1.0 // indirect
github.com/spf13/pflag v1.0.5 // indirect
github.com/subosito/gotenv v1.2.0 // indirect
github.com/xo/terminfo v0.0.0-20210125001918-ca9a967f8778 // indirect
golang.org/x/sys v0.0.0-20210601080250-7ecdf8ef093b // indirect
golang.org/x/text v0.3.6 // indirect
gopkg.in/ini.v1 v1.62.0 // indirect
gopkg.in/yaml.v2 v2.4.0 // indirect
)

================================================
FILE: go.sum
================================================
cloud.google.com/go v0.26.0/go.mod h1:aQUYkXzVsufM+DwF1aE+0xfcU+56JwCaLick0ClmMTw=
cloud.google.com/go v0.34.0/go.mod h1:aQUYkXzVsufM+DwF1aE+0xfcU+56JwCaLick0ClmMTw=
cloud.google.com/go v0.38.0/go.mod h1:990N+gfupTy94rShfmMCWGDn0LpTmnzTp2qbd1dvSRU=
cloud.google.com/go v0.44.1/go.mod h1:iSa0KzasP4Uvy3f1mN/7PiObzGgflwredwwASm/v6AU=
cloud.google.com/go v0.44.2/go.mod h1:60680Gw3Yr4ikxnPRS/oxxkBccT6SA1yMk63TGekxKY=
cloud.google.com/go v0.45.1/go.mod h1:RpBamKRgapWJb87xiFSdk4g1CME7QZg3uwTez+TSTjc=
cloud.google.com/go v0.46.3/go.mod h1:a6bKKbmY7er1mI7TEI4lsAkts/mkhTSZK8w33B4RAg0=
cloud.google.com/go/bigquery v1.0.1/go.mod h1:i/xbL2UlR5RvWAURpBYZTtm/cXjCha9lbfbpx4poX+o=
cloud.google.com/go/datastore v1.0.0/go.mod h1:LXYbyblFSglQ5pkeyhO+Qmw7ukd3C+pD7TKLgZqpHYE=
cloud.google.com/go/firestore v1.1.0/go.mod h1:ulACoGHTpvq5r8rxGJ4ddJZBZqakUQqClKRT5SZwBmk=
cloud.google.com/go/pubsub v1.0.1/go.mod h1:R0Gpsv3s54REJCy4fxDixWD93lHJMoZTyQ2kNxGRt3I=
cloud.google.com/go/storage v1.0.0/go.mod h1:IhtSnM/ZTZV8YYJWCY8RULGVqBDmpoyjwiyrjsg+URw=
dmitri.shuralyov.com/gpu/mtl v0.0.0-20190408044501-666a987793e9/go.mod h1:H6x//7gZCb22OMCxBHrMx7a5I7Hp++hsVxbQ4BYO7hU=
github.com/BurntSushi/toml v0.3.1/go.mod h1:xHWCNGjB5oqiDr8zfno3MHue2Ht5sIBksp03qcyfWMU=
github.com/BurntSushi/xgb v0.0.0-20160522181843-27f122750802/go.mod h1:IVnqGOEym/WlBOVXweHU+Q+/VP0lqqI8lqeDx9IjBqo=
github.com/OneOfOne/xxhash v1.2.2/go.mod h1:HSdplMjZKSmBqAxg5vPj2TmRDmfkzw+cTzAElWljhcU=
github.com/alecthomas/template v0.0.0-20160405071501-a0175ee3bccc/go.mod h1:LOuyumcjzFXgccqObfd/Ljyb9UuFJ6TxHnclSeseNhc=
github.com/alecthomas/units v0.0.0-20151022065526-2efee857e7cf/go.mod h1:ybxpYRFXyAe+OPACYpWeL0wqObRcbAqCMya13uyzqw0=
github.com/armon/circbuf v0.0.0-20150827004946-bbbad097214e/go.mod h1:3U/XgcO3hCbHZ8TKRvWD2dDTCfh9M9ya+I9JpbB7O8o=
github.com/armon/go-metrics v0.0.0-20180917152333-f0300d1749da/go.mod h1:Q73ZrmVTwzkszR9V5SSuryQ31EELlFMUz1kKyl939pY=
github.com/armon/go-radix v0.0.0-20180808171621-7fddfc383310/go.mod h1:ufUuZ+zHj4x4TnLV4JWEpy2hxWSpsRywHrMgIH9cCH8=
github.com/beorn7/perks v0.0.0-20180321164747-3a771d992973/go.mod h1:Dwedo/Wpr24TaqPxmxbtue+5NUziq4I4S80YR8gNf3Q=
github.com/beorn7/perks v1.0.0/go.mod h1:KWe93zE9D1o94FZ5RNwFwVgaQK1VOXiVxmqh+CedLV8=
github.com/bgentry/speakeasy v0.1.0/go.mod h1:+zsyZBPWlz7T6j88CTgSN5bM796AkVf0kBD4zp0CCIs=
github.com/bketelsen/crypt v0.0.3-0.20200106085610-5cbc8cc4026c/go.mod h1:MKsuJmJgSg28kpZDP6UIiPt0e0Oz0kqKNGyRaWEPv84=
github.com/cespare/xxhash v1.1.0/go.mod h1:XrSqR1VqqWfGrhpAt58auRo0WTKS1nRRg3ghfAqPWnc=
github.com/client9/misspell v0.3.4/go.mod h1:qj6jICC3Q7zFZvVWo7KLAzC3yx5G7kyvSDkc90ppPyw=
github.com/coreos/bbolt v1.3.2/go.mod h1:iRUV2dpdMOn7Bo10OQBFzIJO9kkE559Wcmn+qkEiiKk=
github.com/coreos/etcd v3.3.13+incompatible/go.mod h1:uF7uidLiAD3TWHmW31ZFd/JWoc32PjwdhPthX9715RE=
github.com/coreos/go-semver v0.3.0/go.mod h1:nnelYz7RCh+5ahJtPPxZlU+153eP4D4r3EedlOD2RNk=
github.com/coreos/go-systemd v0.0.0-20190321100706-95778dfbb74e/go.mod h1:F5haX7vjVVG0kc13fIWeqUViNPyEJxv/OmvnBo0Yme4=
github.com/coreos/pkg v0.0.0-20180928190104-399ea9e2e55f/go.mod h1:E3G3o1h8I7cfcXa63jLwjI0eiQQMgzzUDFVpN/nH/eA=
github.com/cpuguy83/go-md2man/v2 v2.0.0/go.mod h1:maD7wRr/U5Z6m/iR4s+kqSMx2CaBsrgA7czyZG/E6dU=
github.com/davecgh/go-spew v1.1.0/go.mod h1:J7Y8YcW2NihsgmVo/mv3lAwl/skON4iLHjSsI+c5H38=
github.com/davecgh/go-spew v1.1.1 h1:vj9j/u1bqnvCEfJOwUhtlOARqs3+rkHYY13jYWTU97c=
github.com/davecgh/go-spew v1.1.1/go.mod h1:J7Y8YcW2NihsgmVo/mv3lAwl/skON4iLHjSsI+c5H38=
github.com/dgrijalva/jwt-go v3.2.0+incompatible/go.mod h1:E3ru+11k8xSBh+hMPgOLZmtrrCbhqsmaPHjLKYnJCaQ=
github.com/dgryski/go-sip13 v0.0.0-20181026042036-e10d5fee7954/go.mod h1:vAd38F8PWV+bWy6jNmig1y/TA+kYO4g3RSRF0IAv0no=
github.com/disintegration/imaging v1.6.2 h1:w1LecBlG2Lnp8B3jk5zSuNqd7b4DXhcjwek1ei82L+c=
github.com/disintegration/imaging v1.6.2/go.mod h1:44/5580QXChDfwIclfc/PCwrr44amcmDAg8hxG0Ewe4=
github.com/fatih/color v1.7.0/go.mod h1:Zm6kSWBoL9eyXnKyktHP6abPY2pDugNf5KwzbycvMj4=
github.com/fogleman/gg v1.3.0 h1:/7zJX8F6AaYQc57WQCyN9cAIz+4bCJGO9B+dyW29am8=
github.com/fogleman/gg v1.3.0/go.mod h1:R/bRT+9gY/C5z7JzPU0zXsXHKM4/ayA+zqcVNZzPa1k=
github.com/fsnotify/fsnotify v1.4.7/go.mod h1:jwhsz4b93w/PPRr/qN1Yymfu8t87LnFCMoQvtojpjFo=
github.com/fsnotify/fsnotify v1.4.9 h1:hsms1Qyu0jgnwNXIxa+/V/PDsU6CfLf6CNO8H7IWoS4=
github.com/fsnotify/fsnotify v1.4.9/go.mod h1:znqG4EE+3YCdAaPaxE2ZRY/06pZUdp0tY4IgpuI1SZQ=
github.com/ghodss/yaml v1.0.0/go.mod h1:4dBDuWmgqj2HViK6kFavaiC9ZROes6MMH2rRYeMEF04=
github.com/go-gl/glfw v0.0.0-20190409004039-e6da0acd62b1/go.mod h1:vR7hzQXu2zJy9AVAgeJqvqgH9Q5CA+iKCZ2gyEVpxRU=
github.com/go-kit/kit v0.8.0/go.mod h1:xBxKIO96dXMWWy0MnWVtmwkA9/13aqxPnvrjFYMA2as=
github.com/go-logfmt/logfmt v0.3.0/go.mod h1:Qt1PoO58o5twSAckw1HlFXLmHsOX5/0LbT9GBnD5lWE=
github.com/go-logfmt/logfmt v0.4.0/go.mod h1:3RMwSq7FuexP4Kalkev3ejPJsZTpXXBr9+V4qmtdjCk=
github.com/go-stack/stack v1.8.0/go.mod h1:v0f6uXyyMGvRgIKkXu+yp6POWl0qKG85gN/melR3HDY=
github.com/gogo/protobuf v1.1.1/go.mod h1:r8qH/GZQm5c6nD/R0oafs1akxWv10x8SbQlK7atdtwQ=
github.com/gogo/protobuf v1.2.1/go.mod h1:hp+jE20tsWTFYpLwKvXlhS1hjn+gTNwPg2I6zVXpSg4=
github.com/golang/freetype v0.0.0-20170609003504-e2365dfdc4a0 h1:DACJavvAHhabrF08vX0COfcOBJRhZ8lUbR+ZWIs0Y5g=
github.com/golang/freetype v0.0.0-20170609003504-e2365dfdc4a0/go.mod h1:E/TSTwGwJL78qG/PmXZO1EjYhfJinVAhrmmHX6Z8B9k=
github.com/golang/glog v0.0.0-20160126235308-23def4e6c14b/go.mod h1:SBH7ygxi8pfUlaOkMMuAQtPIUF8ecWP5IEl/CR7VP2Q=
github.com/golang/groupcache v0.0.0-20190129154638-5b532d6fd5ef/go.mod h1:cIg4eruTrX1D+g88fzRXU5OdNfaM+9IcxsU14FzY7Hc=
github.com/golang/mock v1.1.1/go.mod h1:oTYuIxOrZwtPieC+H1uAHpcLFnEyAGVDL/k47Jfbm0A=
github.com/golang/mock v1.2.0/go.mod h1:oTYuIxOrZwtPieC+H1uAHpcLFnEyAGVDL/k47Jfbm0A=
github.com/golang/mock v1.3.1/go.mod h1:sBzyDLLjw3U8JLTeZvSv8jJB+tU5PVekmnlKIyFUx0Y=
github.com/golang/protobuf v1.2.0/go.mod h1:6lQm79b+lXiMfvg/cZm0SGofjICqVBUtrP5yJMmIC1U=
github.com/golang/protobuf v1.3.1/go.mod h1:6lQm79b+lXiMfvg/cZm0SGofjICqVBUtrP5yJMmIC1U=
github.com/golang/protobuf v1.3.2/go.mod h1:6lQm79b+lXiMfvg/cZm0SGofjICqVBUtrP5yJMmIC1U=
github.com/google/btree v0.0.0-20180813153112-4030bb1f1f0c/go.mod h1:lNA+9X1NB3Zf8V7Ke586lFgjr2dZNuvo3lPJSGZ5JPQ=
github.com/google/btree v1.0.0/go.mod h1:lNA+9X1NB3Zf8V7Ke586lFgjr2dZNuvo3lPJSGZ5JPQ=
github.com/google/go-cmp v0.2.0/go.mod h1:oXzfMopK8JAjlY9xF4vHSVASa0yLyX7SntLO5aqRK0M=
github.com/google/go-cmp v0.3.0/go.mod h1:8QqcDgzrUqlUb/G2PQTWiueGozuR1884gddMywk6iLU=
github.com/google/martian v2.1.0+incompatible/go.mod h1:9I4somxYTbIHy5NJKHRl3wXiIaQGbYVAs8BPL6v8lEs=
github.com/google/pprof v0.0.0-20181206194817-3ea8567a2e57/go.mod h1:zfwlbNMJ+OItoe0UupaVj+oy1omPYYDuagoSzA8v9mc=
github.com/google/pprof v0.0.0-20190515194954-54271f7e092f/go.mod h1:zfwlbNMJ+OItoe0UupaVj+oy1omPYYDuagoSzA8v9mc=
github.com/google/renameio v0.1.0/go.mod h1:KWCgfxg9yswjAJkECMjeO8J8rahYeXnNhOm40UhjYkI=
github.com/googleapis/gax-go/v2 v2.0.4/go.mod h1:0Wqv26UfaUD9n4G6kQubkQ+KchISgw+vpHVxEJEs9eg=
github.com/googleapis/gax-go/v2 v2.0.5/go.mod h1:DWXyrwAJ9X0FpwwEdw+IPEYBICEFu5mhpdKc/us6bOk=
github.com/gookit/color v1.4.2 h1:tXy44JFSFkKnELV6WaMo/lLfu/meqITX3iAV52do7lk=
github.com/gookit/color v1.4.2/go.mod h1:fqRyamkC1W8uxl+lxCQxOT09l/vYfZ+QeiX3rKQHCoQ=
github.com/gopherjs/gopherjs v0.0.0-20181017120253-0766667cb4d1 h1:EGx4pi6eqNxGaHF6qqu48+N2wcFQ5qg5FXgOdqsJ5d8=
github.com/gopherjs/gopherjs v0.0.0-20181017120253-0766667cb4d1/go.mod h1:wJfORRmW1u3UXTncJ5qlYoELFm8eSnnEO6hX4iZ3EWY=
github.com/gorilla/websocket v1.4.2/go.mod h1:YR8l580nyteQvAITg2hZ9XVh4b55+EU/adAjf1fMHhE=
github.com/grpc-ecosystem/go-grpc-middleware v1.0.0/go.mod h1:FiyG127CGDf3tlThmgyCl78X/SZQqEOJBCDaAfeWzPs=
github.com/grpc-ecosystem/go-grpc-prometheus v1.2.0/go.mod h1:8NvIoxWQoOIhqOTXgfV/d3M/q6VIi02HzZEHgUlZvzk=
github.com/grpc-ecosystem/grpc-gateway v1.9.0/go.mod h1:vNeuVxBJEsws4ogUvrchl83t/GYV9WGTSLVdBhOQFDY=
github.com/hashicorp/consul/api v1.1.0/go.mod h1:VmuI/Lkw1nC05EYQWNKwWGbkg+FbDBtguAZLlVdkD9Q=
github.com/hashicorp/consul/sdk v0.1.1/go.mod h1:VKf9jXwCTEY1QZP2MOLRhb5i/I/ssyNV1vwHyQBF0x8=
github.com/hashicorp/errwrap v1.0.0/go.mod h1:YH+1FKiLXxHSkmPseP+kNlulaMuP3n2brvKWEqk/Jc4=
github.com/hashicorp/go-cleanhttp v0.5.1/go.mod h1:JpRdi6/HCYpAwUzNwuwqhbovhLtngrth3wmdIIUrZ80=
github.com/hashicorp/go-immutable-radix v1.0.0/go.mod h1:0y9vanUI8NX6FsYoO3zeMjhV/C5i9g4Q3DwcSNZ4P60=
github.com/hashicorp/go-msgpack v0.5.3/go.mod h1:ahLV/dePpqEmjfWmKiqvPkv/twdG7iPBM1vqhUKIvfM=
github.com/hashicorp/go-multierror v1.0.0/go.mod h1:dHtQlpGsu+cZNNAkkCN/P3hoUDHhCYQXV3UM06sGGrk=
github.com/hashicorp/go-rootcerts v1.0.0/go.mod h1:K6zTfqpRlCUIjkwsN4Z+hiSfzSTQa6eBIzfwKfwNnHU=
github.com/hashicorp/go-sockaddr v1.0.0/go.mod h1:7Xibr9yA9JjQq1JpNB2Vw7kxv8xerXegt+ozgdvDeDU=
github.com/hashicorp/go-syslog v1.0.0/go.mod h1:qPfqrKkXGihmCqbJM2mZgkZGvKG1dFdvsLplgctolz4=
github.com/hashicorp/go-uuid v1.0.0/go.mod h1:6SBZvOh/SIDV7/2o3Jml5SYk/TvGqwFJ/bN7x4byOro=
github.com/hashicorp/go-uuid v1.0.1/go.mod h1:6SBZvOh/SIDV7/2o3Jml5SYk/TvGqwFJ/bN7x4byOro=
github.com/hashicorp/go.net v0.0.1/go.mod h1:hjKkEWcCURg++eb33jQU7oqQcI9XDCnUzHA0oac0k90=
github.com/hashicorp/golang-lru v0.5.0/go.mod h1:/m3WP610KZHVQ1SGc6re/UDhFvYD7pJ4Ao+sR/qLZy8=
github.com/hashicorp/golang-lru v0.5.1/go.mod h1:/m3WP610KZHVQ1SGc6re/UDhFvYD7pJ4Ao+sR/qLZy8=
github.com/hashicorp/hcl v1.0.0 h1:0Anlzjpi4vEasTeNFn2mLJgTSwt0+6sfsiTG8qcWGx4=
github.com/hashicorp/hcl v1.0.0/go.mod h1:E5yfLk+7swimpb2L/Alb/PJmXilQ/rhwaUYs4T20WEQ=
github.com/hashicorp/logutils v1.0.0/go.mod h1:QIAnNjmIWmVIIkWDTG1z5v++HQmx9WQRO+LraFDTW64=
github.com/hashicorp/mdns v1.0.0/go.mod h1:tL+uN++7HEJ6SQLQ2/p+z2pH24WQKWjBPkE0mNTz8vQ=
github.com/hashicorp/memberlist v0.1.3/go.mod h1:ajVTdAv/9Im8oMAAj5G31PhhMCZJV2pPBoIllUwCN7I=
github.com/hashicorp/serf v0.8.2/go.mod h1:6hOLApaqBFA1NXqRQAsxw9QxuDEvNxSQRwA/JwenrHc=
github.com/inconshreveable/mousetrap v1.0.0 h1:Z8tu5sraLXCXIcARxBp/8cbvlwVa7Z1NHg9XEKhtSvM=
github.com/inconshreveable/mousetrap v1.0.0/go.mod h1:PxqpIevigyE2G7u3NXJIT2ANytuPF1OarO4DADm73n8=
github.com/jonboulle/clockwork v0.1.0/go.mod h1:Ii8DK3G1RaLaWxj9trq07+26W01tbo22gdxWY5EU2bo=
github.com/json-iterator/go v1.1.6/go.mod h1:+SdeFBvtyEkXs7REEP0seUULqWtbJapLOCVDaaPEHmU=
github.com/jstemmer/go-junit-report v0.0.0-20190106144839-af01ea7f8024/go.mod h1:6v2b51hI/fHJwM22ozAgKL4VKDeJcHhJFhtBdhmNjmU=
github.com/jtolds/gls v4.20.0+incompatible h1:xdiiI2gbIgH/gLH7ADydsJ1uDOEzR8yvV7C0MuV77Wo=
github.com/jtolds/gls v4.20.0+incompatible/go.mod h1:QJZ7F/aHp+rZTRtaJ1ow/lLfFfVYBRgL+9YlvaHOwJU=
github.com/julienschmidt/httprouter v1.2.0/go.mod h1:SYymIcj16QtmaHHD7aYtjjsJG7VTCxuUUipMqKk8s4w=
github.com/kisielk/errcheck v1.1.0/go.mod h1:EZBBE59ingxPouuu3KfxchcWSUPOHkagtvWXihfKN4Q=
github.com/kisielk/gotool v1.0.0/go.mod h1:XhKaO+MFFWcvkIS/tQcRk01m1F5IRFswLeQ+oQHNcck=
github.com/konsorten/go-windows-terminal-sequences v1.0.1/go.mod h1:T0+1ngSBFLxvqU3pZ+m/2kptfBszLMUkC4ZK/EgS/cQ=
github.com/kr/fs v0.1.0/go.mod h1:FFnZGqtBN9Gxj7eW1uZ42v5BccTP0vu6NEaFoC2HwRg=
github.com/kr/logfmt v0.0.0-20140226030751-b84e30acd515/go.mod h1:+0opPa2QZZtGFBFZlji/RkVcI2GknAs/DXo4wKdlNEc=
github.com/kr/pretty v0.1.0 h1:L/CwN0zerZDmRFUapSPitk6f+Q3+0za1rQkzVuMiMFI=
github.com/kr/pretty v0.1.0/go.mod h1:dAy3ld7l9f0ibDNOQOHHMYYIIbhfbHSm3C4ZsoJORNo=
github.com/kr/pty v1.1.1/go.mod h1:pFQYn66WHrOpPYNljwOMqo10TkYh1fy3cYio2l3bCsQ=
github.com/kr/text v0.1.0 h1:45sCR5RtlFHMR4UwH9sdQ5TC8v0qDQCHnXt+kaKSTVE=
github.com/kr/text v0.1.0/go.mod h1:4Jbv+DJW3UT/LiOwJeYQe1efqtUx/iVham/4vfdArNI=
github.com/magiconair/properties v1.8.1/go.mod h1:PppfXfuXeibc/6YijjN8zIbojt8czPbwD3XqdrwzmxQ=
github.com/magiconair/properties v1.8.5 h1:b6kJs+EmPFMYGkow9GiUyCyOvIwYetYJ3fSaWak/Gls=
github.com/magiconair/properties v1.8.5/go.mod h1:y3VJvCyxH9uVvJTWEGAELF3aiYNyPKd5NZ3oSwXrF60=
github.com/makeworld-the-better-one/dither/v2 v2.2.0 h1:VTMAiyyO1YIO07fZwuLNZZasJgKUmvsIA48ze3ALHPQ=
github.com/makeworld-the-better-one/dither/v2 v2.2.0/go.mod h1:VBtN8DXO7SNtyGmLiGA7IsFeKrBkQPze1/iAeM95arc=
github.com/mattn/go-colorable v0.0.9/go.mod h1:9vuHe8Xs5qXnSaW/c/ABM9alt+Vo+STaOChaDxuIBZU=
github.com/mattn/go-isatty v0.0.3/go.mod h1:M+lRXTBqGeGNdLjl/ufCoiOlB5xdOkqRJdNxMWT7Zi4=
github.com/matttproud/golang_protobuf_extensions v1.0.1/go.mod h1:D8He9yQNgCq6Z5Ld7szi9bcBfOoFv/3dc6xSMkL2PC0=
github.com/miekg/dns v1.0.14/go.mod h1:W1PPwlIAgtquWBMBEV9nkV9Cazfe8ScdGz/Lj7v3Nrg=
github.com/mitchellh/cli v1.0.0/go.mod h1:hNIlj7HEI86fIcpObd7a0FcrxTWetlwJDGcceTlRvqc=
github.com/mitchellh/go-homedir v1.0.0/go.mod h1:SfyaCUpYCn1Vlf4IUYiD9fPX4A5wJrkLzIz1N1q0pr0=
github.com/mitchellh/go-homedir v1.1.0 h1:lukF9ziXFxDFPkA1vsr5zpc1XuPDn/wFntq5mG+4E0Y=
github.com/mitchellh/go-homedir v1.1.0/go.mod h1:SfyaCUpYCn1Vlf4IUYiD9fPX4A5wJrkLzIz1N1q0pr0=
github.com/mitchellh/go-testing-interface v1.0.0/go.mod h1:kRemZodwjscx+RGhAo8eIhFbs2+BFgRtFPeD/KE+zxI=
github.com/mitchellh/gox v0.4.0/go.mod h1:Sd9lOJ0+aimLBi73mGofS1ycjY8lL3uZM3JPS42BGNg=
github.com/mitchellh/iochan v1.0.0/go.mod h1:JwYml1nuB7xOzsp52dPpHFffvOCDupsG0QubkSMEySY=
github.com/mitchellh/mapstructure v0.0.0-20160808181253-ca63d7c062ee/go.mod h1:FVVH3fgwuzCH5S8UJGiWEs2h04kUh9fWfEaFds41c1Y=
github.com/mitchellh/mapstructure v1.1.2/go.mod h1:FVVH3fgwuzCH5S8UJGiWEs2h04kUh9fWfEaFds41c1Y=
github.com/mitchellh/mapstructure v1.4.1 h1:CpVNEelQCZBooIPDn+AR3NpivK/TIKU8bDxdASFVQag=
github.com/mitchellh/mapstructure v1.4.1/go.mod h1:bFUtVrKA4DC2yAKiSyO/QUcy7e+RRV2QTWOzhPopBRo=
github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd/go.mod h1:6dJC0mAP4ikYIbvyc7fijjWJddQyLn8Ig3JB5CqoB9Q=
github.com/modern-go/reflect2 v1.0.1/go.mod h1:bx2lNnkwVCuqBIxFjflWJWanXIb3RllmbCylyMrvgv0=
github.com/mwitkow/go-conntrack v0.0.0-20161129095857-cc309e4a2223/go.mod h1:qRWi+5nqEBWmkhHvq77mSJWrCKwh8bxhgT7d/eI7P4U=
github.com/nathan-fiscaletti/consolesize-go v0.0.0-20210105204122-a87d9f614b9d h1:PQW4Aqovdqc9efHl9EVA+bhKmuZ4ME1HvSYYDvaDiK0=
github.com/nathan-fiscaletti/consolesize-go v0.0.0-20210105204122-a87d9f614b9d/go.mod h1:cxIIfNMTwff8f/ZvRouvWYF6wOoO7nj99neWSx2q/Es=
github.com/oklog/ulid v1.3.1/go.mod h1:CirwcVhetQ6Lv90oh/F+FBtV6XMibvdAFo93nm5qn4U=
github.com/pascaldekloe/goe v0.0.0-20180627143212-57f6aae5913c/go.mod h1:lzWF7FIEvWOWxwDKqyGYQf6ZUaNfKdP144TG7ZOy1lc=
github.com/pelletier/go-toml v1.2.0/go.mod h1:5z9KED0ma1S8pY6P1sdut58dfprrGBbd/94hg7ilaic=
github.com/pelletier/go-toml v1.9.1 h1:a6qW1EVNZWH9WGI6CsYdD8WAylkoXBS5yv0XHlh17Tc=
github.com/pelletier/go-toml v1.9.1/go.mod h1:u1nR/EPcESfeI/szUZKdtJ0xRNbUoANCkoOuaOx1Y+c=
github.com/pkg/errors v0.8.0/go.mod h1:bwawxfHBFNV+L2hUp1rHADufV3IMtnDRdf1r5NINEl0=
github.com/pkg/errors v0.8.1/go.mod h1:bwawxfHBFNV+L2hUp1rHADufV3IMtnDRdf1r5NINEl0=
github.com/pkg/sftp v1.10.1/go.mod h1:lYOWFsE0bwd1+KfKJaKeuokY15vzFx25BLbzYYoAxZI=
github.com/pmezard/go-difflib v1.0.0 h1:4DBwDE0NGyQoBHbLQYPwSUPoCMWR5BEzIk/f1lZbAQM=
github.com/pmezard/go-difflib v1.0.0/go.mod h1:iKH77koFhYxTK1pcRnkKkqfTogsbg7gZNVY4sRDYZ/4=
github.com/posener/complete v1.1.1/go.mod h1:em0nMJCgc9GFtwrmVmEMR/ZL6WyhyjMBndrE9hABlRI=
github.com/prometheus/client_golang v0.9.1/go.mod h1:7SWBe2y4D6OKWSNQJUaRYU/AaXPKyh/dDVn+NZz0KFw=
github.com/prometheus/client_golang v0.9.3/go.mod h1:/TN21ttK/J9q6uSwhBd54HahCDft0ttaMvbicHlPoso=
github.com/prometheus/client_model v0.0.0-20180712105110-5c3871d89910/go.mod h1:MbSGuTsp3dbXC40dX6PRTWyKYBIrTGTE9sqQNg2J8bo=
github.com/prometheus/client_model v0.0.0-20190129233127-fd36f4220a90/go.mod h1:xMI15A0UPsDsEKsMN9yxemIoYk6Tm2C1GtYGdfGttqA=
github.com/prometheus/common v0.0.0-20181113130724-41aa239b4cce/go.mod h1:daVV7qP5qjZbuso7PdcryaAu0sAZbrN9i7WWcTMWvro=
github.com/prometheus/common v0.4.0/go.mod h1:TNfzLD0ON7rHzMJeJkieUDPYmFC7Snx/y86RQel1bk4=
github.com/prometheus/procfs v0.0.0-20181005140218-185b4288413d/go.mod h1:c3At6R/oaqEKCNdg8wHV1ftS6bRYblBhIjjI8uT2IGk=
github.com/prometheus/procfs v0.0.0-20190507164030-5867b95ac084/go.mod h1:TjEm7ze935MbeOT/UhFTIMYKhuLP4wbCsTZCD3I8kEA=
github.com/prometheus/tsdb v0.7.1/go.mod h1:qhTCs0VvXwvX/y3TZrWD7rabWM+ijKTux40TwIPHuXU=
github.com/rogpeppe/fastuuid v0.0.0-20150106093220-6724a57986af/go.mod h1:XWv6SoW27p1b0cqNHllgS5HIMJraePCO15w5zCzIWYg=
github.com/rogpeppe/go-internal v1.3.0/go.mod h1:M8bDsm7K2OlrFYOpmOWEs/qY81heoFRclV5y23lUDJ4=
github.com/russross/blackfriday/v2 v2.0.1/go.mod h1:+Rmxgy9KzJVeS9/2gXHxylqXiyQDYRxCVz55jmeOWTM=
github.com/ryanuber/columnize v0.0.0-20160712163229-9b3edd62028f/go.mod h1:sm1tb6uqfes/u+d4ooFouqFdy9/2g9QGwK3SQygK0Ts=
github.com/sean-/seed v0.0.0-20170313163322-e2103e2c3529/go.mod h1:DxrIzT+xaE7yg65j358z/aeFdxmN0P9QXhEzd20vsDc=
github.com/shurcooL/sanitized_anchor_name v1.0.0/go.mod h1:1NzhyTcUVG4SuEtjjoZeVRXNmyL/1OwPU0+IJeTBvfc=
github.com/sirupsen/logrus v1.2.0/go.mod h1:LxeOpSwHxABJmUn/MG1IvRgCAasNZTLOkJPxbbu5VWo=
github.com/smartystreets/assertions v0.0.0-20180927180507-b2de0cb4f26d h1:zE9ykElWQ6/NYmHa3jpm/yHnI4xSofP+UP6SpjHcSeM=
github.com/smartystreets/assertions v0.0.0-20180927180507-b2de0cb4f26d/go.mod h1:OnSkiWE9lh6wB0YB77sQom3nweQdgAjqCqsofrRNTgc=
github.com/smartystreets/goconvey v1.6.4 h1:fv0U8FUIMPNf1L9lnHLvLhgicrIVChEkdzIKYqbNC9s=
github.com/smartystreets/goconvey v1.6.4/go.mod h1:syvi0/a8iFYH4r/RixwvyeAJjdLS9QV7WQ/tjFTllLA=
github.com/soheilhy/cmux v0.1.4/go.mod h1:IM3LyeVVIOuxMH7sFAkER9+bJ4dT7Ms6E4xg4kGIyLM=
github.com/spaolacci/murmur3 v0.0.0-20180118202830-f09979ecbc72/go.mod h1:JwIasOWyU6f++ZhiEuf87xNszmSA2myDM2Kzu9HwQUA=
github.com/spf13/afero v1.1.2/go.mod h1:j4pytiNVoe2o6bmDsKpLACNPDBIoEAkihy7loJ1B0CQ=
github.com/spf13/afero v1.6.0 h1:xoax2sJ2DT8S8xA2paPFjDCScCNeWsg75VG0DLRreiY=
github.com/spf13/afero v1.6.0/go.mod h1:Ai8FlHk4v/PARR026UzYexafAt9roJ7LcLMAmO6Z93I=
github.com/spf13/cast v1.3.0/go.mod h1:Qx5cxh0v+4UWYiBimWS+eyWzqEqokIECu5etghLkUJE=
github.com/spf13/cast v1.3.1 h1:nFm6S0SMdyzrzcmThSipiEubIDy8WEXKNZ0UOgiRpng=
github.com/spf13/cast v1.3.1/go.mod h1:Qx5cxh0v+4UWYiBimWS+eyWzqEqokIECu5etghLkUJE=
github.com/spf13/cobra v1.1.3 h1:xghbfqPkxzxP3C/f3n5DdpAbdKLj4ZE4BWQI362l53M=
github.com/spf13/cobra v1.1.3/go.mod h1:pGADOWyqRD/YMrPZigI/zbliZ2wVD/23d+is3pSWzOo=
github.com/spf13/jwalterweatherman v1.0.0/go.mod h1:cQK4TGJAtQXfYWX+Ddv3mKDzgVb68N+wFjFa4jdeBTo=
github.com/spf13/jwalterweatherman v1.1.0 h1:ue6voC5bR5F8YxI5S67j9i582FU4Qvo2bmqnqMYADFk=
github.com/spf13/jwalterweatherman v1.1.0/go.mod h1:aNWZUN0dPAAO/Ljvb5BEdw96iTZ0EXowPYD95IqWIGo=
github.com/spf13/pflag v1.0.3/go.mod h1:DYY7MBk1bdzusC3SYhjObp+wFpr4gzcvqqNjLnInEg4=
github.com/spf13/pflag v1.0.5 h1:iy+VFUOCP1a+8yFto/drg2CJ5u0yRoB7fZw3DKv/JXA=
github.com/spf13/pflag v1.0.5/go.mod h1:McXfInJRrz4CZXVZOBLb0bTZqETkiAhM9Iw0y3An2Bg=
github.com/spf13/viper v1.7.0/go.mod h1:8WkrPz2fc9jxqZNCJI/76HCieCp4Q8HaLFoCha5qpdg=
github.com/spf13/viper v1.7.1 h1:pM5oEahlgWv/WnHXpgbKz7iLIxRf65tye2Ci+XFK5sk=
github.com/spf13/viper v1.7.1/go.mod h1:8WkrPz2fc9jxqZNCJI/76HCieCp4Q8HaLFoCha5qpdg=
github.com/stretchr/objx v0.1.0/go.mod h1:HFkY916IF+rwdDfMAkV7OtwuqBVzrE8GR6GFx+wExME=
github.com/stretchr/objx v0.1.1/go.mod h1:HFkY916IF+rwdDfMAkV7OtwuqBVzrE8GR6GFx+wExME=
github.com/stretchr/testify v1.2.2/go.mod h1:a8OnRcib4nhh0OaRAV+Yts87kKdq0PP7pXfy6kDkUVs=
github.com/stretchr/testify v1.3.0/go.mod h1:M5WIy9Dh21IEIfnGCwXGc5bZfKNJtfHm1UVUgZn+9EI=
github.com/stretchr/testify v1.4.0/go.mod h1:j7eGeouHqKxXV5pUuKE4zz7dFj8WfuZ+81PSLYec5m4=
github.com/stretchr/testify v1.6.1 h1:hDPOHmpOpP40lSULcqw7IrRb/u7w6RpDC9399XyoNd0=
github.com/stretchr/testify v1.6.1/go.mod h1:6Fq8oRcR53rry900zMqJjRRixrwX3KX962/h/Wwjteg=
github.com/subosito/gotenv v1.2.0 h1:Slr1R9HxAlEKefgq5jn9U+DnETlIUa6HfgEzj0g5d7s=
github.com/subosito/gotenv v1.2.0/go.mod h1:N0PQaV/YGNqwC0u51sEeR/aUtSLEXKX9iv69rRypqCw=
github.com/tmc/grpc-websocket-proxy v0.0.0-20190109142713-0ad062ec5ee5/go.mod h1:ncp9v5uamzpCO7NfCPTXjqaC+bZgJeR0sMTm6dMHP7U=
github.com/xiang90/probing v0.0.0-20190116061207-43a291ad63a2/go.mod h1:UETIi67q53MR2AWcXfiuqkDkRtnGDLqkBTpCHuJHxtU=
github.com/xo/terminfo v0.0.0-20210125001918-ca9a967f8778 h1:QldyIu/L63oPpyvQmHgvgickp1Yw510KJOqX7H24mg8=
github.com/xo/terminfo v0.0.0-20210125001918-ca9a967f8778/go.mod h1:2MuV+tbUrU1zIOPMxZ5EncGwgmMJsa+9ucAQZXxsObs=
go.etcd.io/bbolt v1.3.2/go.mod h1:IbVyRI1SCnLcuJnV2u8VeU0CEYM7e686BmAb1XKL+uU=
go.opencensus.io v0.21.0/go.mod h1:mSImk1erAIZhrmZN+AvHh14ztQfjbGwt4TtuofqLduU=
go.opencensus.io v0.22.0/go.mod h1:+kGneAE2xo2IficOXnaByMWTGM9T73dGwxeWcUqIpI8=
go.uber.org/atomic v1.4.0/go.mod h1:gD2HeocX3+yG+ygLZcrzQJaqmWj9AIm7n08wl/qW/PE=
go.uber.org/multierr v1.1.0/go.mod h1:wR5kodmAFQ0UK8QlbwjlSNy0Z68gJhDJUG5sjR94q/0=
go.uber.org/zap v1.10.0/go.mod h1:vwi/ZaCAaUcBkycHslxD9B2zi4UTXhF60s6SWpuDF0Q=
golang.org/x/crypto v0.0.0-20180904163835-0709b304e793/go.mod h1:6SG95UA2DQfeDnfUPMdvaQW0Q7yPrPDi9nlGo2tz2b4=
golang.org/x/crypto v0.0.0-20181029021203-45a5f77698d3/go.mod h1:6SG95UA2DQfeDnfUPMdvaQW0Q7yPrPDi9nlGo2tz2b4=
golang.org/x/crypto v0.0.0-20190308221718-c2843e01d9a2/go.mod h1:djNgcEr1/C05ACkg1iLfiJU5Ep61QUkGW8qpdssI0+w=
golang.org/x/crypto v0.0.0-20190510104115-cbcb75029529/go.mod h1:yigFU9vqHzYiE8UmvKecakEJjdnWj3jj499lnFckfCI=
golang.org/x/crypto v0.0.0-20190605123033-f99c8df09eb5/go.mod h1:yigFU9vqHzYiE8UmvKecakEJjdnWj3jj499lnFckfCI=
golang.org/x/crypto v0.0.0-20190820162420-60c769a6c586/go.mod h1:yigFU9vqHzYiE8UmvKecakEJjdnWj3jj499lnFckfCI=
golang.org/x/exp v0.0.0-20190121172915-509febef88a4/go.mod h1:CJ0aWSM057203Lf6IL+f9T1iT9GByDxfZKAQTCR3kQA=
golang.org/x/exp v0.0.0-20190306152737-a1d7652674e8/go.mod h1:CJ0aWSM057203Lf6IL+f9T1iT9GByDxfZKAQTCR3kQA=
golang.org/x/exp v0.0.0-20190510132918-efd6b22b2522/go.mod h1:ZjyILWgesfNpC6sMxTJOJm9Kp84zZh5NQWvqDGG3Qr8=
golang.org/x/exp v0.0.0-20190829153037-c13cbed26979/go.mod h1:86+5VVa7VpoJ4kLfm080zCjGlMRFzhUhsZKEZO7MGek=
golang.org/x/exp v0.0.0-20191030013958-a1ab85dbe136/go.mod h1:JXzH8nQsPlswgeRAPE3MuO9GYsAcnJvJ4vnMwN/5qkY=
golang.org/x/image v0.0.0-20190227222117-0694c2d4d067/go.mod h1:kZ7UVZpmo3dzQBMxlp+ypCbDeSB+sBbTgSJuh5dn5js=
golang.org/x/image v0.0.0-20190802002840-cff245a6509b/go.mod h1:FeLwcggjj3mMvU+oOTbSwawSJRM1uh48EjtB4UJZlP0=
golang.org/x/image v0.0.0-20191009234506-e7c1f5e7dbb8/go.mod h1:FeLwcggjj3mMvU+oOTbSwawSJRM1uh48EjtB4UJZlP0=
golang.org/x/image v0.0.0-20210628002857-a66eb6448b8d h1:RNPAfi2nHY7C2srAV8A49jpsYr0ADedCk1wq6fTMTvs=
golang.org/x/image v0.0.0-20210628002857-a66eb6448b8d/go.mod h1:023OzeP/+EPmXeapQh35lcL3II3LrY8Ic+EFFKVhULM=
golang.org/x/lint v0.0.0-20181026193005-c67002cb31c3/go.mod h1:UVdnD1Gm6xHRNCYTkRU2/jEulfH38KcIWyp/GAMgvoE=
golang.org/x/lint v0.0.0-20190227174305-5b3e6a55c961/go.mod h1:wehouNa3lNwaWXcvxsM5YxQ5yQlVC4a0KAMCusXpPoU=
golang.org/x/lint v0.0.0-20190301231843-5614ed5bae6f/go.mod h1:UVdnD1Gm6xHRNCYTkRU2/jEulfH38KcIWyp/GAMgvoE=
golang.org/x/lint v0.0.0-20190313153728-d0100b6bd8b3/go.mod h1:6SW0HCj/g11FgYtHlgUYUwCkIfeOF89ocIRzGO/8vkc=
golang.org/x/lint v0.0.0-20190409202823-959b441ac422/go.mod h1:6SW0HCj/g11FgYtHlgUYUwCkIfeOF89ocIRzGO/8vkc=
golang.org/x/lint v0.0.0-20190909230951-414d861bb4ac/go.mod h1:6SW0HCj/g11FgYtHlgUYUwCkIfeOF89ocIRzGO/8vkc=
golang.org/x/lint v0.0.0-20190930215403-16217165b5de/go.mod h1:6SW0HCj/g11FgYtHlgUYUwCkIfeOF89ocIRzGO/8vkc=
golang.org/x/mobile v0.0.0-20190312151609-d3739f865fa6/go.mod h1:z+o9i4GpDbdi3rU15maQ/Ox0txvL9dWGYEHz965HBQE=
golang.org/x/mobile v0.0.0-20190719004257-d2bd2a29d028/go.mod h1:E/iHnbuqvinMTCcRqshq8CkpyQDoeVncDDYHnLhea+o=
golang.org/x/mod v0.0.0-20190513183733-4bf6d317e70e/go.mod h1:mXi4GBBbnImb6dmsKGUJ2LatrhH/nqhxcFungHvyanc=
golang.org/x/mod v0.1.0/go.mod h1:0QHyrYULN0/3qlju5TqG8bIK38QM8yzMo5ekMj3DlcY=
golang.org/x/net v0.0.0-20180724234803-3673e40ba225/go.mod h1:mL1N/T3taQHkDXs73rZJwtUhF3w3ftmwwsq0BUmARs4=
golang.org/x/net v0.0.0-20180826012351-8a410e7b638d/go.mod h1:mL1N/T3taQHkDXs73rZJwtUhF3w3ftmwwsq0BUmARs4=
golang.org/x/net v0.0.0-20181023162649-9b4f9f5ad519/go.mod h1:mL1N/T3taQHkDXs73rZJwtUhF3w3ftmwwsq0BUmARs4=
golang.org/x/net v0.0.0-20181114220301-adae6a3d119a/go.mod h1:mL1N/T3taQHkDXs73rZJwtUhF3w3ftmwwsq0BUmARs4=
golang.org/x/net v0.0.0-20181201002055-351d144fa1fc/go.mod h1:mL1N/T3taQHkDXs73rZJwtUhF3w3ftmwwsq0BUmARs4=
golang.org/x/net v0.0.0-20181220203305-927f97764cc3/go.mod h1:mL1N/T3taQHkDXs73rZJwtUhF3w3ftmwwsq0BUmARs4=
golang.org/x/net v0.0.0-20190108225652-1e06a53dbb7e/go.mod h1:mL1N/T3taQHkDXs73rZJwtUhF3w3ftmwwsq0BUmARs4=
golang.org/x/net v0.0.0-20190213061140-3a22650c66bd/go.mod h1:mL1N/T3taQHkDXs73rZJwtUhF3w3ftmwwsq0BUmARs4=
golang.org/x/net v0.0.0-20190311183353-d8887717615a/go.mod h1:t9HGtf8HONx5eT2rtn7q6eTqICYqUVnKs3thJo3Qplg=
golang.org/x/net v0.0.0-20190404232315-eb5bcb51f2a3/go.mod h1:t9HGtf8HONx5eT2rtn7q6eTqICYqUVnKs3thJo3Qplg=
golang.org/x/net v0.0.0-20190501004415-9ce7a6920f09/go.mod h1:t9HGtf8HONx5eT2rtn7q6eTqICYqUVnKs3thJo3Qplg=
golang.org/x/net v0.0.0-20190503192946-f4e77d36d62c/go.mod h1:t9HGtf8HONx5eT2rtn7q6eTqICYqUVnKs3thJo3Qplg=
golang.org/x/net v0.0.0-20190603091049-60506f45cf65/go.mod h1:HSz+uSET+XFnRR8LxR5pz3Of3rY3CfYBVs4xY44aLks=
golang.org/x/net v0.0.0-20190620200207-3b0461eec859/go.mod h1:z5CRVTTTmAJ677TzLLGU+0bjPO0LkuOLi4/5GtJWs/s=
golang.org/x/oauth2 v0.0.0-20180821212333-d2e6202438be/go.mod h1:N/0e6XlmueqKjAGxoOufVs8QHGRruUQn6yWY3a++T0U=
golang.org/x/oauth2 v0.0.0-20190226205417-e64efc72b421/go.mod h1:gOpvHmFTYa4IltrdGE7lF6nIHvwfUNPOp7c8zoXwtLw=
golang.org/x/oauth2 v0.0.0-20190604053449-0f29369cfe45/go.mod h1:gOpvHmFTYa4IltrdGE7lF6nIHvwfUNPOp7c8zoXwtLw=
golang.org/x/sync v0.0.0-20180314180146-1d60e4601c6f/go.mod h1:RxMgew5VJxzue5/jJTE5uejpjVlOe/izrB70Jof72aM=
golang.org/x/sync v0.0.0-20181108010431-42b317875d0f/go.mod h1:RxMgew5VJxzue5/jJTE5uejpjVlOe/izrB70Jof72aM=
golang.org/x/sync v0.0.0-20181221193216-37e7f081c4d4/go.mod h1:RxMgew5VJxzue5/jJTE5uejpjVlOe/izrB70Jof72aM=
golang.org/x/sync v0.0.0-20190227155943-e225da77a7e6/go.mod h1:RxMgew5VJxzue5/jJTE5uejpjVlOe/izrB70Jof72aM=
golang.org/x/sync v0.0.0-20190423024810-112230192c58/go.mod h1:RxMgew5VJxzue5/jJTE5uejpjVlOe/izrB70Jof72aM=
golang.org/x/sys v0.0.0-20180823144017-11551d06cbcc/go.mod h1:STP8DvDyc/dI5b8T5hshtkjS+E42TnysNCUPdjciGhY=
golang.org/x/sys v0.0.0-20180830151530-49385e6e1522/go.mod h1:STP8DvDyc/dI5b8T5hshtkjS+E42TnysNCUPdjciGhY=
golang.org/x/sys v0.0.0-20180905080454-ebe1bf3edb33/go.mod h1:STP8DvDyc/dI5b8T5hshtkjS+E42TnysNCUPdjciGhY=
golang.org/x/sys v0.0.0-20181026203630-95b1ffbd15a5/go.mod h1:STP8DvDyc/dI5b8T5hshtkjS+E42TnysNCUPdjciGhY=
golang.org/x/sys v0.0.0-20181107165924-66b7b1311ac8/go.mod h1:STP8DvDyc/dI5b8T5hshtkjS+E42TnysNCUPdjciGhY=
golang.org/x/sys v0.0.0-20181116152217-5ac8a444bdc5/go.mod h1:STP8DvDyc/dI5b8T5hshtkjS+E42TnysNCUPdjciGhY=
golang.org/x/sys v0.0.0-20190215142949-d0b11bdaac8a/go.mod h1:STP8DvDyc/dI5b8T5hshtkjS+E42TnysNCUPdjciGhY=
golang.org/x/sys v0.0.0-20190312061237-fead79001313/go.mod h1:h1NjWce9XRLGQEsW7wpKNCjG9DtNlClVuFLEZdDNbEs=
golang.org/x/sys v0.0.0-20190412213103-97732733099d/go.mod h1:h1NjWce9XRLGQEsW7wpKNCjG9DtNlClVuFLEZdDNbEs=
golang.org/x/sys v0.0.0-20190502145724-3ef323f4f1fd/go.mod h1:h1NjWce9XRLGQEsW7wpKNCjG9DtNlClVuFLEZdDNbEs=
golang.org/x/sys v0.0.0-20190507160741-ecd444e8653b/go.mod h1:h1NjWce9XRLGQEsW7wpKNCjG9DtNlClVuFLEZdDNbEs=
golang.org/x/sys v0.0.0-20190606165138-5da285871e9c/go.mod h1:h1NjWce9XRLGQEsW7wpKNCjG9DtNlClVuFLEZdDNbEs=
golang.org/x/sys v0.0.0-20190624142023-c5567b49c5d0/go.mod h1:h1NjWce9XRLGQEsW7wpKNCjG9DtNlClVuFLEZdDNbEs=
golang.org/x/sys v0.0.0-20191005200804-aed5e4c7ecf9/go.mod h1:h1NjWce9XRLGQEsW7wpKNCjG9DtNlClVuFLEZdDNbEs=
golang.org/x/sys v0.0.0-20210330210617-4fbd30eecc44/go.mod h1:h1NjWce9XRLGQEsW7wpKNCjG9DtNlClVuFLEZdDNbEs=
golang.org/x/sys v0.0.0-20210601080250-7ecdf8ef093b h1:qh4f65QIVFjq9eBURLEYWqaEXmOyqdUyiBSgaXWccWk=
golang.org/x/sys v0.0.0-20210601080250-7ecdf8ef093b/go.mod h1:oPkhp1MJrh7nUepCBck5+mAzfO9JrbApNNgaTdGDITg=
golang.org/x/text v0.3.0/go.mod h1:NqM8EUOU14njkJ3fqMW+pc6Ldnwhi/IjpwHt7yyuwOQ=
golang.org/x/text v0.3.1-0.20180807135948-17ff2d5776d2/go.mod h1:NqM8EUOU14njkJ3fqMW+pc6Ldnwhi/IjpwHt7yyuwOQ=
golang.org/x/text v0.3.2/go.mod h1:bEr9sfX3Q8Zfm5fL9x+3itogRgK3+ptLWKqgva+5dAk=
golang.org/x/text v0.3.3/go.mod h1:5Zoc/QRtKVWzQhOtBMvqHzDpF6irO9z98xDceosuGiQ=
golang.org/x/text v0.3.6 h1:aRYxNxv6iGQlyVaZmk6ZgYEDa+Jg18DxebPSrd6bg1M=
golang.org/x/text v0.3.6/go.mod h1:5Zoc/QRtKVWzQhOtBMvqHzDpF6irO9z98xDceosuGiQ=
golang.org/x/time v0.0.0-20181108054448-85acf8d2951c/go.mod h1:tRJNPiyCQ0inRvYxbN9jk5I+vvW/OXSQhTDSoE431IQ=
golang.org/x/time v0.0.0-20190308202827-9d24e82272b4/go.mod h1:tRJNPiyCQ0inRvYxbN9jk5I+vvW/OXSQhTDSoE431IQ=
golang.org/x/tools v0.0.0-20180221164845-07fd8470d635/go.mod h1:n7NCudcB/nEzxVGmLbDWY5pfWTLqBcC2KZ6jyYvM4mQ=
golang.org/x/tools v0.0.0-20180917221912-90fa682c2a6e/go.mod h1:n7NCudcB/nEzxVGmLbDWY5pfWTLqBcC2KZ6jyYvM4mQ=
golang.org/x/tools v0.0.0-20190114222345-bf090417da8b/go.mod h1:n7NCudcB/nEzxVGmLbDWY5pfWTLqBcC2KZ6jyYvM4mQ=
golang.org/x/tools v0.0.0-20190226205152-f727befe758c/go.mod h1:9Yl7xja0Znq3iFh3HoIrodX9oNMXvdceNzlUR8zjMvY=
golang.org/x/tools v0.0.0-20190311212946-11955173bddd/go.mod h1:LCzVGOaR6xXOjkQ3onu1FJEFr0SW1gC7cKk1uF8kGRs=
golang.org/x/tools v0.0.0-20190312151545-0bb0c0a6e846/go.mod h1:LCzVGOaR6xXOjkQ3onu1FJEFr0SW1gC7cKk1uF8kGRs=
golang.org/x/tools v0.0.0-20190312170243-e65039ee4138/go.mod h1:LCzVGOaR6xXOjkQ3onu1FJEFr0SW1gC7cKk1uF8kGRs=
golang.org/x/tools v0.0.0-20190328211700-ab21143f2384/go.mod h1:LCzVGOaR6xXOjkQ3onu1FJEFr0SW1gC7cKk1uF8kGRs=
golang.org/x/tools v0.0.0-20190425150028-36563e24a262/go.mod h1:RgjU9mgBXZiqYHBnxXauZ1Gv1EHHAz9KjViQ78xBX0Q=
golang.org/x/tools v0.0.0-20190506145303-2d16b83fe98c/go.mod h1:RgjU9mgBXZiqYHBnxXauZ1Gv1EHHAz9KjViQ78xBX0Q=
golang.org/x/tools v0.0.0-20190606124116-d0a3d012864b/go.mod h1:/rFqwRUd4F7ZHNgwSSTFct+R/Kf4OFW1sUzUTQQTgfc=
golang.org/x/tools v0.0.0-20190621195816-6e04913cbbac/go.mod h1:/rFqwRUd4F7ZHNgwSSTFct+R/Kf4OFW1sUzUTQQTgfc=
golang.org/x/tools v0.0.0-20190628153133-6cdbf07be9d0/go.mod h1:/rFqwRUd4F7ZHNgwSSTFct+R/Kf4OFW1sUzUTQQTgfc=
golang.org/x/tools v0.0.0-20190816200558-6889da9d5479/go.mod h1:b+2E5dAYhXwXZwtnZ6UAqBI28+e2cm9otk0dWdXHAEo=
golang.org/x/tools v0.0.0-20190911174233-4f2ddba30aff/go.mod h1:b+2E5dAYhXwXZwtnZ6UAqBI28+e2cm9otk0dWdXHAEo=
golang.org/x/tools v0.0.0-20191012152004-8de300cfc20a/go.mod h1:b+2E5dAYhXwXZwtnZ6UAqBI28+e2cm9otk0dWdXHAEo=
golang.org/x/tools v0.0.0-20191112195655-aa38f8e97acc/go.mod h1:b+2E5dAYhXwXZwtnZ6UAqBI28+e2cm9otk0dWdXHAEo=
golang.org/x/xerrors v0.0.0-20190717185122-a985d3407aa7/go.mod h1:I/5z698sn9Ka8TeJc9MKroUUfqBBauWjQqLJ2OPfmY0=
google.golang.org/api v0.4.0/go.mod h1:8k5glujaEP+g9n7WNsDg8QP6cUVNI86fCNMcbazEtwE=
google.golang.org/api v0.7.0/go.mod h1:WtwebWUNSVBH/HAw79HIFXZNqEvBhG+Ra+ax0hx3E3M=
google.golang.org/api v0.8.0/go.mod h1:o4eAsZoiT+ibD93RtjEohWalFOjRDx6CVaqeizhEnKg=
google.golang.org/api v0.9.0/go.mod h1:o4eAsZoiT+ibD93RtjEohWalFOjRDx6CVaqeizhEnKg=
google.golang.org/api v0.13.0/go.mod h1:iLdEw5Ide6rF15KTC1Kkl0iskquN2gFfn9o9XIsbkAI=
google.golang.org/appengine v1.1.0/go.mod h1:EbEs0AVv82hx2wNQdGPgUI5lhzA/G0D9YwlJXL52JkM=
google.golang.org/appengine v1.4.0/go.mod h1:xpcJRLb0r/rnEns0DIKYYv+WjYCduHsrkT7/EB5XEv4=
google.golang.org/appengine v1.5.0/go.mod h1:xpcJRLb0r/rnEns0DIKYYv+WjYCduHsrkT7/EB5XEv4=
google.golang.org/appengine v1.6.1/go.mod h1:i06prIuMbXzDqacNJfV5OdTW448YApPu5ww/cMBSeb0=
google.golang.org/genproto v0.0.0-20180817151627-c66870c02cf8/go.mod h1:JiN7NxoALGmiZfu7CAH4rXhgtRTLTxftemlI0sWmxmc=
google.golang.org/genproto v0.0.0-20190307195333-5fe7a883aa19/go.mod h1:VzzqZJRnGkLBvHegQrXjBqPurQTc5/KpmUdxsrq26oE=
google.golang.org/genproto v0.0.0-20190418145605-e7d98fc518a7/go.mod h1:VzzqZJRnGkLBvHegQrXjBqPurQTc5/KpmUdxsrq26oE=
google.golang.org/genproto v0.0.0-20190425155659-357c62f0e4bb/go.mod h1:VzzqZJRnGkLBvHegQrXjBqPurQTc5/KpmUdxsrq26oE=
google.golang.org/genproto v0.0.0-20190502173448-54afdca5d873/go.mod h1:VzzqZJRnGkLBvHegQrXjBqPurQTc5/KpmUdxsrq26oE=
google.golang.org/genproto v0.0.0-20190801165951-fa694d86fc64/go.mod h1:DMBHOl98Agz4BDEuKkezgsaosCRResVns1a3J2ZsMNc=
google.golang.org/genproto v0.0.0-20190819201941-24fa4b261c55/go.mod h1:DMBHOl98Agz4BDEuKkezgsaosCRResVns1a3J2ZsMNc=
google.golang.org/genproto v0.0.0-20190911173649-1774047e7e51/go.mod h1:IbNlFCBrqXvoKpeg0TB2l7cyZUmoaFKYIwrEpbDKLA8=
google.golang.org/genproto v0.0.0-20191108220845-16a3f7862a1a/go.mod h1:n3cpQtvxv34hfy77yVDNjmbRyujviMdxYliBSkLhpCc=
google.golang.org/grpc v1.19.0/go.mod h1:mqu4LbDTu4XGKhr4mRzUsmM4RtVoemTSY81AxZiDr8c=
google.golang.org/grpc v1.20.1/go.mod h1:10oTOabMzJvdu6/UiuZezV6QK5dSlG84ov/aaiqXj38=
google.golang.org/grpc v1.21.1/go.mod h1:oYelfM1adQP15Ek0mdvEgi9Df8B9CZIaU1084ijfRaM=
gopkg.in/alecthomas/kingpin.v2 v2.2.6/go.mod h1:FMv+mEhP44yOT+4EoQTLFTRgOQ1FBLkstjWtayDeSgw=
gopkg.in/check.v1 v0.0.0-20161208181325-20d25e280405/go.mod h1:Co6ibVJAznAaIkqp8huTwlJQCZ016jof/cbN4VW5Yz0=
gopkg.in/check.v1 v1.0.0-20180628173108-788fd7840127 h1:qIbj1fsPNlZgppZ+VLlY7N33q108Sa+fhmuc+sWQYwY=
gopkg.in/check.v1 v1.0.0-20180628173108-788fd7840127/go.mod h1:Co6ibVJAznAaIkqp8huTwlJQCZ016jof/cbN4VW5Yz0=
gopkg.in/errgo.v2 v2.1.0/go.mod h1:hNsd1EY+bozCKY1Ytp96fpM3vjJbqLJn88ws8XvfDNI=
gopkg.in/ini.v1 v1.51.0/go.mod h1:pNLf8WUiyNEtQjuu5G5vTm06TEv9tsIgeAvK8hOrP4k=
gopkg.in/ini.v1 v1.62.0 h1:duBzk771uxoUuOlyRLkHsygud9+5lrlGjdFBb4mSKDU=
gopkg.in/ini.v1 v1.62.0/go.mod h1:pNLf8WUiyNEtQjuu5G5vTm06TEv9tsIgeAvK8hOrP4k=
gopkg.in/resty.v1 v1.12.0/go.mod h1:mDo4pnntr5jdWRML875a/NmxYqAlA73dVijT2AXvQQo=
gopkg.in/yaml.v2 v2.0.0-20170812160011-eb3733d160e7/go.mod h1:JAlM8MvJe8wmxCU4Bli9HhUf9+ttbYbLASfIpnQbh74=
gopkg.in/yaml.v2 v2.2.1/go.mod h1:hI93XBmqTisBFMUTm0b8Fm+jr3Dg1NNxqwp+5A1VGuI=
gopkg.in/yaml.v2 v2.2.2/go.mod h1:hI93XBmqTisBFMUTm0b8Fm+jr3Dg1NNxqwp+5A1VGuI=
gopkg.in/yaml.v2 v2.2.4/go.mod h1:hI93XBmqTisBFMUTm0b8Fm+jr3Dg1NNxqwp+5A1VGuI=
gopkg.in/yaml.v2 v2.4.0 h1:D8xgwECY7CYvx+Y2n4sBz93Jn9JRvxdiyyo8CTfuKaY=
gopkg.in/yaml.v2 v2.4.0/go.mod h1:RDklbk79AGWmwhnvt/jBztapEOGDOx6ZbXqjP6csGnQ=
gopkg.in/yaml.v3 v3.0.0-20200313102051-9f266ea9e77c h1:dUUwHk2QECo/6vqA44rthZ8ie2QXMNeKRTHCNY2nXvo=
gopkg.in/yaml.v3 v3.0.0-20200313102051-9f266ea9e77c/go.mod h1:K4uyk7z7BCEPqu6E+C64Yfv1cQ7kz7rIZviUmN+EgEM=
honnef.co/go/tools v0.0.0-20190102054323-c2f93a96b099/go.mod h1:rf3lG4BRIbNafJWhAfAdb/ePZxsR/4RtNHQocxwk9r4=
honnef.co/go/tools v0.0.0-20190106161140-3f1c8253044a/go.mod h1:rf3lG4BRIbNafJWhAfAdb/ePZxsR/4RtNHQocxwk9r4=
honnef.co/go/tools v0.0.0-20190418001031-e561f6794a2a/go.mod h1:rf3lG4BRIbNafJWhAfAdb/ePZxsR/4RtNHQocxwk9r4=
honnef.co/go/tools v0.0.1-2019.2.3/go.mod h1:a3bituU0lyd329TUQxRnasdCoJDkEUEAqEt0JzvZhAg=
rsc.io/binaryregexp v0.2.0/go.mod h1:qTv7/COck+e2FymRvadv62gMdZztPaShugOCi3I+8D8=

================================================
FILE: LICENSE.txt
================================================

                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

1.  Definitions.

    "License" shall mean the terms and conditions for use, reproduction,
    and distribution as defined by Sections 1 through 9 of this document.

    "Licensor" shall mean the copyright owner or entity authorized by
    the copyright owner that is granting the License.

    "Legal Entity" shall mean the union of the acting entity and all
    other entities that control, are controlled by, or are under common
    control with that entity. For the purposes of this definition,
    "control" means (i) the power, direct or indirect, to cause the
    direction or management of such entity, whether by contract or
    otherwise, or (ii) ownership of fifty percent (50%) or more of the
    outstanding shares, or (iii) beneficial ownership of such entity.

    "You" (or "Your") shall mean an individual or Legal Entity
    exercising permissions granted by this License.

    "Source" form shall mean the preferred form for making modifications,
    including but not limited to software source code, documentation
    source, and configuration files.

    "Object" form shall mean any form resulting from mechanical
    transformation or translation of a Source form, including but
    not limited to compiled object code, generated documentation,
    and conversions to other media types.

    "Work" shall mean the work of authorship, whether in Source or
    Object form, made available under the License, as indicated by a
    copyright notice that is included in or attached to the work
    (an example is provided in the Appendix below).

    "Derivative Works" shall mean any work, whether in Source or Object
    form, that is based on (or derived from) the Work and for which the
    editorial revisions, annotations, elaborations, or other modifications
    represent, as a whole, an original work of authorship. For the purposes
    of this License, Derivative Works shall not include works that remain
    separable from, or merely link (or bind by name) to the interfaces of,
    the Work and Derivative Works thereof.

    "Contribution" shall mean any work of authorship, including
    the original version of the Work and any modifications or additions
    to that Work or Derivative Works thereof, that is intentionally
    submitted to Licensor for inclusion in the Work by the copyright owner
    or by an individual or Legal Entity authorized to submit on behalf of
    the copyright owner. For the purposes of this definition, "submitted"
    means any form of electronic, verbal, or written communication sent
    to the Licensor or its representatives, including but not limited to
    communication on electronic mailing lists, source code control systems,
    and issue tracking systems that are managed by, or on behalf of, the
    Licensor for the purpose of discussing and improving the Work, but
    excluding communication that is conspicuously marked or otherwise
    designated in writing by the copyright owner as "Not a Contribution."

    "Contributor" shall mean Licensor and any individual or Legal Entity
    on behalf of whom a Contribution has been received by Licensor and
    subsequently incorporated within the Work.

2.  Grant of Copyright License. Subject to the terms and conditions of
    this License, each Contributor hereby grants to You a perpetual,
    worldwide, non-exclusive, no-charge, royalty-free, irrevocable
    copyright license to reproduce, prepare Derivative Works of,
    publicly display, publicly perform, sublicense, and distribute the
    Work and such Derivative Works in Source or Object form.

3.  Grant of Patent License. Subject to the terms and conditions of
    this License, each Contributor hereby grants to You a perpetual,
    worldwide, non-exclusive, no-charge, royalty-free, irrevocable
    (except as stated in this section) patent license to make, have made,
    use, offer to sell, sell, import, and otherwise transfer the Work,
    where such license applies only to those patent claims licensable
    by such Contributor that are necessarily infringed by their
    Contribution(s) alone or by combination of their Contribution(s)
    with the Work to which such Contribution(s) was submitted. If You
    institute patent litigation against any entity (including a
    cross-claim or counterclaim in a lawsuit) alleging that the Work
    or a Contribution incorporated within the Work constitutes direct
    or contributory patent infringement, then any patent licenses
    granted to You under this License for that Work shall terminate
    as of the date such litigation is filed.

4.  Redistribution. You may reproduce and distribute copies of the
    Work or Derivative Works thereof in any medium, with or without
    modifications, and in Source or Object form, provided that You
    meet the following conditions:

    (a) You must give any other recipients of the Work or
    Derivative Works a copy of this License; and

    (b) You must cause any modified files to carry prominent notices
    stating that You changed the files; and

    (c) You must retain, in the Source form of any Derivative Works
    that You distribute, all copyright, patent, trademark, and
    attribution notices from the Source form of the Work,
    excluding those notices that do not pertain to any part of
    the Derivative Works; and

    (d) If the Work includes a "NOTICE" text file as part of its
    distribution, then any Derivative Works that You distribute must
    include a readable copy of the attribution notices contained
    within such NOTICE file, excluding those notices that do not
    pertain to any part of the Derivative Works, in at least one
    of the following places: within a NOTICE text file distributed
    as part of the Derivative Works; within the Source form or
    documentation, if provided along with the Derivative Works; or,
    within a display generated by the Derivative Works, if and
    wherever such third-party notices normally appear. The contents
    of the NOTICE file are for informational purposes only and
    do not modify the License. You may add Your own attribution
    notices within Derivative Works that You distribute, alongside
    or as an addendum to the NOTICE text from the Work, provided
    that such additional attribution notices cannot be construed
    as modifying the License.

    You may add Your own copyright statement to Your modifications and
    may provide additional or different license terms and conditions
    for use, reproduction, or distribution of Your modifications, or
    for any such Derivative Works as a whole, provided Your use,
    reproduction, and distribution of the Work otherwise complies with
    the conditions stated in this License.

5.  Submission of Contributions. Unless You explicitly state otherwise,
    any Contribution intentionally submitted for inclusion in the Work
    by You to the Licensor shall be under the terms and conditions of
    this License, without any additional terms or conditions.
    Notwithstanding the above, nothing herein shall supersede or modify
    the terms of any separate license agreement you may have executed
    with Licensor regarding such Contributions.

6.  Trademarks. This License does not grant permission to use the trade
    names, trademarks, service marks, or product names of the Licensor,
    except as required for reasonable and customary use in describing the
    origin of the Work and reproducing the content of the NOTICE file.

7.  Disclaimer of Warranty. Unless required by applicable law or
    agreed to in writing, Licensor provides the Work (and each
    Contributor provides its Contributions) on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
    implied, including, without limitation, any warranties or conditions
    of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
    PARTICULAR PURPOSE. You are solely responsible for determining the
    appropriateness of using or redistributing the Work and assume any
    risks associated with Your exercise of permissions under this License.

8.  Limitation of Liability. In no event and under no legal theory,
    whether in tort (including negligence), contract, or otherwise,
    unless required by applicable law (such as deliberate and grossly
    negligent acts) or agreed to in writing, shall any Contributor be
    liable to You for damages, including any direct, indirect, special,
    incidental, or consequential damages of any character arising as a
    result of this License or out of the use or inability to use the
    Work (including but not limited to damages for loss of goodwill,
    work stoppage, computer failure or malfunction, or any and all
    other commercial damages or losses), even if such Contributor
    has been advised of the possibility of such damages.

9.  Accepting Warranty or Additional Liability. While redistributing
    the Work or Derivative Works thereof, You may choose to offer,
    and charge a fee for, acceptance of support, warranty, indemnity,
    or other liability obligations and/or rights consistent with this
    License. However, in accepting such obligations, You may act only
    on Your own behalf and on Your sole responsibility, not on behalf
    of any other Contributor, and only if You agree to indemnify,
    defend, and hold each Contributor harmless for any liability
    incurred by, or claims asserted against, such Contributor by reason
    of your accepting any such warranty or additional liability.

END OF TERMS AND CONDITIONS

================================================
FILE: main.go
================================================
/\*
Copyright © 2021 Zoraiz Hassan <hzoraiz8@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
\*/

package main

import "github.com/TheZoraiz/ascii-image-converter/cmd"

func main() {
cmd.Execute()
}

================================================
FILE: snapcraft.yaml
================================================
name: ascii-image-converter
base: core18
version: "1.13.1"
summary: Convert images and gifs into ascii art
description: |
ascii-image-converter is a command-line tool that converts images into ascii art and prints
them out onto the console. Supported input formats are JPEG/JPG, PNG, WEBP, BMP, TIFF/TIF and GIF.
Now supports braille art.

grade: stable
confinement: strict

license: Apache-2.0

parts:
ascii-image-converter:
plugin: go
go-importpath: github.com/TheZoraiz/ascii-image-converter
source: .
build-packages: - gcc

apps:
ascii-image-converter:
command: bin/ascii-image-converter
plugs: - home - network

architectures:

- build-on: amd64
  run-on: [amd64, i386, arm64, armhf, s390x, ppc64el]

================================================
FILE: .goreleaser.yml
================================================
project_name: ascii-image-converter

before:
hooks: - go mod tidy

builds:

- goos:

  - linux
  - windows
  - darwin

  goarch:

  # Architectures for executable binary generation

  - amd64
  - arm64
  - arm
  - 386

  # # Specifying all architectures for .deb and .rpm generation

  # - 386

  # - amd64

  # - arm

  # - arm64

  # - ppc64

  # - ppc64le

  # - mips

  # - mipsle

  # - mips64

  # - mips64le

archives:

- name*template: "{{ .ProjectName }}*{{ .Os }}\_{{ .Arch }}"
  wrap_in_directory: true

  format_overrides:

  - goos: windows
    format: zip

  files:

  - LICENSE.txt
  - README.md

  replacements:
  linux: Linux
  windows: Windows
  darwin: macOS
  amd64: amd64_64bit
  arm64: arm64_64bit
  386: i386_32bit
  arm: armv6_32bit

checksum:
name_template: 'sha256_checksums.txt'
algorithm: sha256

snapshot:
name_template: "{{ .Version }}-next"
changelog:
sort: asc
filters:
exclude: - '^docs:' - '^test:'

brews:

- name: ascii-image-converter

  tap:
  owner: TheZoraiz
  name: homebrew-ascii-image-converter

  url_template: https://github.com/TheZoraiz/ascii-image-converter/releases/download/{{ .Tag }}/{{ .ArtifactName }}

  commit_author:
  name: Zoraiz Hassan
  email: hzoraiz8@gmail.com

  homepage: https://github.com/TheZoraiz/ascii-image-converter
  description: Convert images into ascii art
  license: Apache 2.0
  skip_upload: true

  test: |
  system "#{bin}/ascii-image-converter --version"

  install: |
  bin.install "ascii-image-converter"

nfpms:

- package*name: ascii-image-converter
  file_name_template: "{{ .ProjectName }}*{{ .Version }}\_{{ .Arch }}"

  homepage: https://github.com/TheZoraiz/ascii-image-converter
  vendor: Zoraiz Hassan
  maintainer: Zoraiz Hassan <hzoraiz8@gmail.com>
  description: Convert images into ascii art
  license: Apache 2.0

  formats:

  - deb
  - rpm

  release: 1
  section: graphics
  priority: optional
  bindir: /usr/bin

  rpm:
  compression: lzma

================================================
FILE: aic_package/readme.md
================================================

## Note

The font `DejaVuSans-Oblique.ttf` is used for saving braille art .png images since it supports unicode and gave the best results. `Hack-Regular.ttf` is used for saving normal ascii art .png images.

================================================
FILE: aic_package/convert_gif.go
================================================
/\*
Copyright © 2021 Zoraiz Hassan <hzoraiz8@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
\*/

package aic_package

import (
"bytes"
"fmt"
"image"
"image/color/palette"
"image/draw"
"image/gif"
"os"
"runtime"
"strconv"
"strings"
"sync"
"time"

    imgManip "github.com/TheZoraiz/ascii-image-converter/image_manipulation"

)

type GifFrame struct {
asciiCharSet [][]imgManip.AsciiChar
delay int
}

/\*
This function grabs each image frame from passed gif and turns it into ascii art. If SaveGifPath flag is passed,
it'll turn each ascii art into an image instance of the same dimensions as the original gif and save them
as an ascii art gif.

Multi-threading has been implemented in multiple places due to long execution time
*/
func pathIsGif(gifPath, urlImgName string, pathIsURl bool, urlImgBytes, pipedInputBytes []byte, localGif *os.File) error {

    var (
    	originalGif *gif.GIF
    	err         error
    )

    if gifPath == "-" {
    	originalGif, err = gif.DecodeAll(bytes.NewReader(pipedInputBytes))
    } else if pathIsURl {
    	originalGif, err = gif.DecodeAll(bytes.NewReader(urlImgBytes))
    } else {
    	originalGif, err = gif.DecodeAll(localGif)
    }
    if err != nil {
    	if gifPath == "-" {
    		return fmt.Errorf("can't decode piped input: %v", err)
    	} else {
    		return fmt.Errorf("can't decode %v: %v", gifPath, err)
    	}
    }

    var (
    	asciiArtSet    = make([]string, len(originalGif.Image))
    	gifFramesSlice = make([]GifFrame, len(originalGif.Image))

    	counter             = 0
    	concurrentProcesses = 0
    	wg                  sync.WaitGroup
    	hostCpuCount        = runtime.NumCPU()
    )

    fmt.Printf("Generating ascii art... 0%%\r")

    // Get first frame of gif and its dimensions
    firstGifFrame := originalGif.Image[0].SubImage(originalGif.Image[0].Rect)
    firstGifFrameWidth := firstGifFrame.Bounds().Dx()
    firstGifFrameHeight := firstGifFrame.Bounds().Dy()

    // Multi-threaded loop to decrease execution time
    for i, frame := range originalGif.Image {

    	wg.Add(1)
    	concurrentProcesses++

    	go func(i int, frame *image.Paletted) {

    		frameImage := frame.SubImage(frame.Rect)

    		// If a frame is found that is smaller than the first frame, then this gif contains smaller subimages that are
    		// positioned inside the original gif. This behavior isn't supported by this app
    		if firstGifFrameWidth != frameImage.Bounds().Dx() || firstGifFrameHeight != frameImage.Bounds().Dy() {
    			if urlImgName == "" {
    				fmt.Printf("Error: " + gifPath + " contains subimages smaller than default width and height\n\nProcess aborted because ascii-image-converter doesn't support subimage placement and transparency in GIFs\n\n")
    			} else {
    				fmt.Printf("Error: " + urlImgName + " contains subimages smaller than default width and height\n\nProcess aborted because ascii-image-converter doesn't support subimage placement and transparency in GIFs\n\n")
    			}
    			os.Exit(0)
    		}

    		var imgSet [][]imgManip.AsciiPixel

    		imgSet, err = imgManip.ConvertToAsciiPixels(frameImage, dimensions, width, height, flipX, flipY, full, braille, dither)
    		if err != nil {
    			fmt.Printf("Error: %v\n", err)
    			os.Exit(0)
    		}

    		var asciiCharSet [][]imgManip.AsciiChar
    		if braille {
    			asciiCharSet, err = imgManip.ConvertToBrailleChars(imgSet, negative, colored, grayscale, colorBg, fontColor, threshold)
    		} else {
    			asciiCharSet, err = imgManip.ConvertToAsciiChars(imgSet, negative, colored, grayscale, complex, colorBg, customMap, fontColor)
    		}
    		if err != nil {
    			fmt.Printf("Error: %v\n", err)
    			os.Exit(0)
    		}

    		gifFramesSlice[i].asciiCharSet = asciiCharSet
    		gifFramesSlice[i].delay = originalGif.Delay[i]

    		ascii := flattenAscii(asciiCharSet, colored || grayscale, false)

    		asciiArtSet[i] = strings.Join(ascii, "\n")

    		counter++
    		percentage := int((float64(counter) / float64(len(originalGif.Image))) * 100)
    		fmt.Printf("Generating ascii art... " + strconv.Itoa(percentage) + "%%\r")

    		wg.Done()

    	}(i, frame)

    	// Limit concurrent processes according to host's CPU count to avoid overwhelming memory
    	if concurrentProcesses == hostCpuCount {
    		wg.Wait()
    		concurrentProcesses = 0
    	}
    }

    wg.Wait()
    fmt.Printf("                              \r")

    // Save ascii art as .gif file before displaying it, if --save-gif flag is passed
    if saveGifPath != "" {

    	// Storing save path string before executing ascii art to gif conversion
    	// This is done to avoid wasting time for invalid path errors

    	saveFileName, err := createSaveFileName(gifPath, urlImgName, "-ascii-art.gif")
    	if err != nil {
    		return err
    	}

    	fullPathName, err := getFullSavePath(saveFileName, saveGifPath)
    	if err != nil {
    		return fmt.Errorf("can't save file: %v", err)
    	}

    	// Initializing some constants for gif. Done outside loop to save execution
    	outGif := &gif.GIF{
    		LoopCount: originalGif.LoopCount,
    	}
    	opts := gif.Options{
    		NumColors: 256,
    		Drawer:    draw.FloydSteinberg,
    	}

    	// Initializing slices for each ascii art image as well as delay
    	var (
    		palettedImageSlice = make([]*image.Paletted, len(gifFramesSlice))
    		delaySlice         = make([]int, len(gifFramesSlice))
    	)

    	// For the purpose of displaying counter and limiting concurrent processes
    	counter = 0
    	concurrentProcesses = 0

    	fmt.Printf("Saving gif... 0%%\r")

    	// Multi-threaded loop to decrease execution time
    	for i, gifFrame := range gifFramesSlice {

    		wg.Add(1)
    		concurrentProcesses++

    		go func(i int, gifFrame GifFrame) {

    			img := originalGif.Image[i].SubImage(originalGif.Image[i].Rect)

    			tempImg, err := createGifFrameToSave(
    				gifFrame.asciiCharSet,
    				img,
    				colored || grayscale,
    			)
    			if err != nil {
    				fmt.Printf("Error: %v\n", err)
    				os.Exit(0)
    			}

    			// Following code takes tempImg as image.Image instance and converts it into *image.Paletted instance
    			b := tempImg.Bounds()

    			palettedImg := image.NewPaletted(b, palette.Plan9[:opts.NumColors])

    			opts.Drawer.Draw(palettedImg, b, tempImg, image.Point{})

    			palettedImageSlice[i] = palettedImg
    			delaySlice[i] = gifFrame.delay

    			counter++
    			percentage := int((float64(counter) / float64(len(gifFramesSlice))) * 100)
    			fmt.Printf("Saving gif... " + strconv.Itoa(percentage) + "%%\r")

    			wg.Done()

    		}(i, gifFrame)

    		// Limit concurrent processes according to host's CPU count to avoid overwhelming memory
    		if concurrentProcesses == hostCpuCount {
    			wg.Wait()
    			concurrentProcesses = 0
    		}

    	}

    	wg.Wait()

    	outGif.Image = palettedImageSlice
    	outGif.Delay = delaySlice

    	gifFile, err := os.OpenFile(fullPathName, os.O_WRONLY|os.O_CREATE, 0666)
    	if err != nil {
    		return fmt.Errorf("can't save file: %v", err)
    	}
    	defer gifFile.Close()

    	gif.EncodeAll(gifFile, outGif)

    	fmt.Printf("                     \r")

    	fmt.Println("Saved " + fullPathName)
    }

    // Display the gif
    if !onlySave {
    	loopCount := 0
    	for {
    		for i, asciiFrame := range asciiArtSet {
    			clearScreen()
    			fmt.Println(asciiFrame)
    			time.Sleep(time.Duration((time.Second * time.Duration(originalGif.Delay[i])) / 100))
    		}

    		// If gif is infinite loop
    		if originalGif.LoopCount == 0 {
    			continue
    		}

    		loopCount++
    		if loopCount == originalGif.LoopCount {
    			break
    		}
    	}
    }

    return nil

}

================================================
FILE: aic_package/convert_image.go
================================================
/\*
Copyright © 2021 Zoraiz Hassan <hzoraiz8@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
\*/

package aic_package

import (
"bytes"
"fmt"
"image"
"os"
"strings"

    imgManip "github.com/TheZoraiz/ascii-image-converter/image_manipulation"

)

// This function decodes the passed image and returns an ascii art string, optionaly saving it as a .txt and/or .png file
func pathIsImage(imagePath, urlImgName string, pathIsURl bool, urlImgBytes, pipedInputBytes []byte, localImg \*os.File) (string, error) {

    var (
    	imData image.Image
    	err    error
    )

    if imagePath == "-" {
    	imData, _, err = image.Decode(bytes.NewReader(pipedInputBytes))
    } else if pathIsURl {
    	imData, _, err = image.Decode(bytes.NewReader(urlImgBytes))
    } else {
    	imData, _, err = image.Decode(localImg)
    }
    if err != nil {
    	if imagePath == "-" {
    		return "", fmt.Errorf("can't decode piped input: %v", err)
    	} else {
    		return "", fmt.Errorf("can't decode %v: %v", imagePath, err)
    	}
    }

    imgSet, err := imgManip.ConvertToAsciiPixels(imData, dimensions, width, height, flipX, flipY, full, braille, dither)
    if err != nil {
    	return "", err
    }

    var asciiSet [][]imgManip.AsciiChar

    if braille {
    	asciiSet, err = imgManip.ConvertToBrailleChars(imgSet, negative, colored, grayscale, colorBg, fontColor, threshold)
    } else {
    	asciiSet, err = imgManip.ConvertToAsciiChars(imgSet, negative, colored, grayscale, complex, colorBg, customMap, fontColor)
    }
    if err != nil {
    	return "", err
    }

    // Save ascii art as .png image before printing it, if --save-img flag is passed
    if saveImagePath != "" {
    	if err := createImageToSave(
    		asciiSet,
    		colored || grayscale,
    		saveImagePath,
    		imagePath,
    		urlImgName,
    		onlySave,
    	); err != nil {

    		return "", fmt.Errorf("can't save file: %v", err)
    	}
    }

    // Save ascii art as .txt file before printing it, if --save-txt flag is passed
    if saveTxtPath != "" {
    	if err := saveAsciiArt(
    		asciiSet,
    		imagePath,
    		saveTxtPath,
    		urlImgName,
    		onlySave,
    	); err != nil {

    		return "", fmt.Errorf("can't save file: %v", err)
    	}
    }

    ascii := flattenAscii(asciiSet, colored || grayscale, false)
    result := strings.Join(ascii, "\n")

    if onlySave {
    	return "", nil
    }
    return result, nil

}

================================================
FILE: aic_package/convert_root.go
================================================
/\*
Copyright © 2021 Zoraiz Hassan <hzoraiz8@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
\*/

package aic_package

import (
"fmt"
"io/ioutil"
"net/http"
"os"
"path"

    // Image format initialization
    _ "image/jpeg"
    _ "image/png"

    // Image format initialization
    _ "golang.org/x/image/bmp"
    _ "golang.org/x/image/tiff"
    _ "golang.org/x/image/webp"

    "github.com/golang/freetype/truetype"

)

var pipedInputTypes = []string{
"image/png",
"image/jpeg",
"image/webp",
"image/tiff",
"image/bmp",
}

// Return default configuration for flags.
// Can be sent directly to ConvertImage() for default ascii art
func DefaultFlags() Flags {
return Flags{
Complex: false,
Dimensions: nil,
Width: 0,
Height: 0,
SaveTxtPath: "",
SaveImagePath: "",
SaveGifPath: "",
Negative: false,
Colored: false,
CharBackgroundColor: false,
Grayscale: false,
CustomMap: "",
FlipX: false,
FlipY: false,
Full: false,
FontFilePath: "",
FontColor: [3]int{255, 255, 255},
SaveBackgroundColor: [4]int{0, 0, 0, 100},
Braille: false,
Threshold: 128,
Dither: false,
OnlySave: false,
}
}

/_
Convert() takes an image or gif path/url as its first argument
and a aic_package.Flags literal as the second argument, with which it alters
the returned ascii art string.
_/
func Convert(filePath string, flags Flags) (string, error) {

    if flags.Dimensions == nil {
    	dimensions = nil
    } else {
    	dimensions = flags.Dimensions
    }
    width = flags.Width
    height = flags.Height
    complex = flags.Complex
    saveTxtPath = flags.SaveTxtPath
    saveImagePath = flags.SaveImagePath
    saveGifPath = flags.SaveGifPath
    negative = flags.Negative
    colored = flags.Colored
    colorBg = flags.CharBackgroundColor
    grayscale = flags.Grayscale
    customMap = flags.CustomMap
    flipX = flags.FlipX
    flipY = flags.FlipY
    full = flags.Full
    fontPath = flags.FontFilePath
    fontColor = flags.FontColor
    saveBgColor = flags.SaveBackgroundColor
    braille = flags.Braille
    threshold = flags.Threshold
    dither = flags.Dither
    onlySave = flags.OnlySave

    inputIsGif = path.Ext(filePath) == ".gif"

    // Declared at the start since some variables are initially used in conditional blocks
    var (
    	localFile       *os.File
    	urlImgBytes     []byte
    	urlImgName      string = ""
    	pipedInputBytes []byte
    	err             error
    )

    pathIsURl := isURL(filePath)

    // Different modes of reading data depending upon whether or not filePath is a url

    if filePath != "-" {
    	if pathIsURl {
    		fmt.Printf("Fetching file from url...\r")

    		retrievedImage, err := http.Get(filePath)
    		if err != nil {
    			return "", fmt.Errorf("can't fetch content: %v", err)
    		}

    		urlImgBytes, err = ioutil.ReadAll(retrievedImage.Body)
    		if err != nil {
    			return "", fmt.Errorf("failed to read fetched content: %v", err)
    		}
    		defer retrievedImage.Body.Close()

    		urlImgName = path.Base(filePath)
    		fmt.Printf("                          \r") // To erase "Fetching image from url..." text from terminal

    	} else {

    		localFile, err = os.Open(filePath)
    		if err != nil {
    			return "", fmt.Errorf("unable to open file: %v", err)
    		}
    		defer localFile.Close()

    	}

    } else {
    	// Check file/data type of piped input

    	if !isInputFromPipe() {
    		return "", fmt.Errorf("there is no input being piped to stdin")
    	}

    	pipedInputBytes, err = ioutil.ReadAll(os.Stdin)
    	if err != nil {
    		return "", fmt.Errorf("unable to read piped input: %v", err)
    	}

    	fileType := http.DetectContentType(pipedInputBytes)
    	invalidInput := true

    	if fileType == "image/gif" {
    		inputIsGif = true
    		invalidInput = false

    	} else {
    		for _, inputType := range pipedInputTypes {
    			if fileType == inputType {
    				invalidInput = false
    				break
    			}
    		}
    	}

    	// Not sure if I should uncomment this.
    	// The output may be piped to another program and a warning would contaminate that
    	if invalidInput {
    		// fmt.Println("Warning: file type of piped input could not be determined, treating it as an image")
    	}
    }

    // If path to font file is provided, use it
    if fontPath != "" {
    	fontFile, err := ioutil.ReadFile(fontPath)
    	if err != nil {
    		return "", fmt.Errorf("unable to open font file: %v", err)
    	}

    	// tempFont is globally declared in aic_package/create_ascii_image.go
    	if tempFont, err = truetype.Parse(fontFile); err != nil {
    		return "", fmt.Errorf("unable to parse font file: %v", err)
    	}
    } else if braille {
    	tempFont, _ = truetype.Parse(embeddedDejaVuObliqueFont)
    }

    if inputIsGif {
    	return "", pathIsGif(filePath, urlImgName, pathIsURl, urlImgBytes, pipedInputBytes, localFile)
    } else {
    	return pathIsImage(filePath, urlImgName, pathIsURl, urlImgBytes, pipedInputBytes, localFile)
    }

}

================================================
FILE: aic_package/create_ascii_gif.go
================================================
/\*
Copyright © 2021 Zoraiz Hassan <hzoraiz8@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
\*/

package aic_package

import (
"image"
"image/color"

    _ "embed"

    imgManip "github.com/TheZoraiz/ascii-image-converter/image_manipulation"
    "github.com/golang/freetype/truetype"

    "github.com/fogleman/gg"

)

/\*
Unlike createImageToSave(), this function is optimized to maintain original image dimensions and shrink ascii
art font size to match it. This allows for greater execution speed, which is necessary since a gif contains
multiple images that need to be converted to ascii art, and the potential loss of ascii art quality (since
large ascii art instances will shrink the font too much).

Furthermore, maintaining original gif's width and height also allows for gifs of smaller size.
\*/
func createGifFrameToSave(asciiArt [][]imgManip.AsciiChar, img image.Image, colored bool) (image.Image, error) {

    // Original image dimensions
    x := img.Bounds().Dx()
    y := img.Bounds().Dy()

    // Ascii art dimensions
    asciiWidth := len(asciiArt[0])
    asciiHeight := len(asciiArt)

    // Iterators to move pointer on the image to be made
    var xIter float64
    var yIter float64

    var fontSize float64

    // Conditions to alter resulting ascii gif dimensions according to ascii art dimensions
    if asciiWidth > asciiHeight*2 {
    	yIter = float64(y) / float64(asciiHeight)

    	xIter = yIter / 2
    	x = int(xIter * float64(asciiWidth))

    	fontSize = xIter

    } else {
    	xIter = float64(x) / float64(asciiWidth)

    	yIter = xIter * 2
    	y = int(yIter * float64(asciiHeight))

    	fontSize = xIter
    }

    // 10 extra pixels on both x and y-axis to have 5 pixels of padding on each side
    x += 10
    y += 10

    tempImg := image.NewRGBA(image.Rect(0, 0, x, y))

    dc := gg.NewContext(x, y)

    // Set image background
    dc.SetRGB(
    	float64(saveBgColor[0])/255,
    	float64(saveBgColor[1])/255,
    	float64(saveBgColor[2])/255,
    )
    dc.Clear()

    dc.DrawImage(tempImg, 0, 0)

    // Font size increased during assignment to become more visible. This will not affect image drawing
    fontFace := truetype.NewFace(tempFont, &truetype.Options{Size: fontSize * 1.5})

    dc.SetFontFace(fontFace)

    // Font color of text on picture is white by default
    dc.SetColor(color.White)

    // Pointer to track y-axis on the image frame
    yImgPointer := 5.0

    // These nested loops print each character in asciArt 2D slice separately
    // so that their RGB colors can be maintained in the resulting image
    for _, line := range asciiArt {

    	// Pointer to track x-axis on the image frame
    	xImgPointer := 5.0

    	for _, char := range line {

    		if colored {
    			// dc.SetColor() sets color for EACH character before printing it
    			r := uint8(char.RgbValue[0])
    			g := uint8(char.RgbValue[1])
    			b := uint8(char.RgbValue[2])
    			dc.SetColor(color.RGBA{r, g, b, 255})

    		} else {
    			r := uint8(fontColor[0])
    			g := uint8(fontColor[1])
    			b := uint8(fontColor[2])
    			dc.SetColor(color.RGBA{r, g, b, 255})
    		}

    		dc.DrawStringWrapped(char.Simple, xImgPointer, yImgPointer, 0, 0, float64(x), 1.8, gg.AlignLeft)

    		// Incremet x-axis pointer character so new one can be printed after it
    		// Set to the same constant as in line
    		xImgPointer += xIter
    	}

    	dc.DrawStringWrapped("\n", xImgPointer, yImgPointer, 0, 0, float64(x), 1.8, gg.AlignLeft)

    	// Incremet pointer for y axis after every line printed, so
    	// new line can start at below the previous one on next iteration
    	yImgPointer += yIter
    }

    return dc.Image(), nil

}

================================================
FILE: aic_package/create_ascii_image.go
================================================
/\*
Copyright © 2021 Zoraiz Hassan <hzoraiz8@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
\*/

package aic_package

import (
"fmt"
"image"
"image/color"

    _ "embed"

    imgManip "github.com/TheZoraiz/ascii-image-converter/image_manipulation"
    "github.com/fogleman/gg"
    "github.com/golang/freetype/truetype"

)

//go:embed Hack-Regular.ttf
var embeddedHackRegularFont []byte

//go:embed DejaVuSans-Oblique.ttf
var embeddedDejaVuObliqueFont []byte

var tempFont \*truetype.Font

// Load embedded font
func init() {
tempFont, \_ = truetype.Parse(embeddedHackRegularFont)
}

/\*
Unlike createGifFrameToSave(), this function is altered to ignore execution time and has a fixed font size.
This creates maximum quality ascii art, although the resulting image will not have the same dimensions
as the original image, but the ascii art quality will be maintained. This is required, since smaller provided
images will considerably decrease ascii art quality because of smaller font size.

Size of resulting image may also be considerably larger than original image.
\*/
func createImageToSave(asciiArt [][]imgManip.AsciiChar, colored bool, saveImagePath, imagePath, urlImgName string, onlySave bool) error {

    constant := 14.0

    x := len(asciiArt[0])
    y := len(asciiArt)

    // Multipying resulting image dimensions with respect to constant
    x = int(constant * float64(x))

    y = int(constant * float64(y))
    y = y * 2

    // 10 extra pixels on both x and y-axis to have 5 pixels of padding on each side
    y += 10
    x += 10

    tempImg := image.NewRGBA(image.Rect(0, 0, x, y))

    imgWidth := tempImg.Bounds().Dx()
    imgHeight := tempImg.Bounds().Dy()

    dc := gg.NewContext(imgWidth, imgHeight)

    // Set image background
    dc.SetRGBA(
    	float64(saveBgColor[0])/255,
    	float64(saveBgColor[1])/255,
    	float64(saveBgColor[2])/255,
    	float64(saveBgColor[3])/100,
    )
    dc.Clear()

    dc.DrawImage(tempImg, 0, 0)

    fontFace := truetype.NewFace(tempFont, &truetype.Options{Size: constant * 1.5})
    dc.SetFontFace(fontFace)

    // Font color of text on picture is white by default
    dc.SetColor(color.White)

    // Pointer to track y-axis on the image frame
    yImgPointer := 5.0

    // These nested loops print each character in asciArt 2D slice separately
    // so that their RGB colors can be maintained in the resulting image
    for _, line := range asciiArt {

    	// Pointer to track x-axis on the image frame
    	xImgPointer := 5.0

    	for _, char := range line {

    		if colored {
    			// dc.SetColor() sets color for EACH character before printing it
    			r := uint8(char.RgbValue[0])
    			g := uint8(char.RgbValue[1])
    			b := uint8(char.RgbValue[2])
    			dc.SetColor(color.RGBA{r, g, b, 255})

    		} else {
    			r := uint8(fontColor[0])
    			g := uint8(fontColor[1])
    			b := uint8(fontColor[2])
    			dc.SetColor(color.RGBA{r, g, b, 255})
    		}

    		dc.DrawStringWrapped(char.Simple, xImgPointer, yImgPointer, 0, 0, float64(x), 1.8, gg.AlignLeft)

    		// Incremet x-axis pointer character so new one can be printed after it
    		// Set to the same constant as in line
    		xImgPointer += float64(constant)
    	}

    	dc.DrawStringWrapped("\n", xImgPointer, yImgPointer, 0, 0, float64(x), 1.8, gg.AlignLeft)

    	// Incremet pointer for y axis after every line printed, so
    	// new line can start at below the previous one on next iteration
    	yImgPointer += float64(constant * 2)
    }

    imageName, err := createSaveFileName(imagePath, urlImgName, "-ascii-art.png")
    if err != nil {
    	return err
    }

    fullPathName, err := getFullSavePath(imageName, saveImagePath)
    if err != nil {
    	return err
    }

    if onlySave {
    	fmt.Println("Saved " + fullPathName)
    }

    return dc.SavePNG(fullPathName)

}

================================================
FILE: aic_package/util.go
================================================
/\*
Copyright © 2021 Zoraiz Hassan <hzoraiz8@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
\*/

package aic_package

import (
"fmt"
"io/ioutil"
"os"
"os/exec"
"path"
"runtime"
"strings"

    imgManip "github.com/TheZoraiz/ascii-image-converter/image_manipulation"

)

func saveAsciiArt(asciiSet [][]imgManip.AsciiChar, imagePath, savePath, urlImgName string, onlySave bool) error {
// To make sure uncolored ascii art is the one saved as .txt
saveAscii := flattenAscii(asciiSet, false, true)

    saveFileName, err := createSaveFileName(imagePath, urlImgName, "-ascii-art.txt")
    if err != nil {
    	return err
    }

    savePathLastChar := string(savePath[len(savePath)-1])

    // Check if path is closed with appropriate path separator (depending on OS)
    if savePathLastChar != string(os.PathSeparator) {
    	savePath += string(os.PathSeparator)
    }

    // If path exists
    if _, err := os.Stat(savePath); !os.IsNotExist(err) {
    	err := ioutil.WriteFile(savePath+saveFileName, []byte(strings.Join(saveAscii, "\n")), 0666)
    	if err != nil {
    		return err
    	} else if onlySave {
    		fmt.Println("Saved " + savePath + saveFileName)
    	}
    	return nil
    } else {
    	return fmt.Errorf("save path %v does not exist", savePath)
    }

}

// Returns new image file name along with extension
func createSaveFileName(imagePath, urlImgName, label string) (string, error) {
if urlImgName != "" {
currExt := path.Ext(urlImgName)
newName := urlImgName[:len(urlImgName)-len(currExt)] // e.g. Grabs myImage from myImage.jpeg

    	return newName + label, nil
    }

    if imagePath == "-" {
    	if inputIsGif {
    		return "piped-gif" + label, nil
    	}
    	return "piped-img" + label, nil
    }

    fileInfo, err := os.Stat(imagePath)
    if err != nil {
    	return "", err
    }

    currName := fileInfo.Name()
    currExt := path.Ext(currName)
    newName := currName[:len(currName)-len(currExt)] // e.g. Grabs myImage from myImage.jpeg

    return newName + label, nil

}

// flattenAscii flattens a two-dimensional grid of ascii characters into a one dimension
// of lines of ascii
func flattenAscii(asciiSet [][]imgManip.AsciiChar, colored, toSaveTxt bool) []string {
var ascii []string

    for _, line := range asciiSet {
    	var tempAscii string

    	for _, char := range line {
    		if toSaveTxt {
    			tempAscii += char.Simple
    			continue
    		}

    		if colored {
    			tempAscii += char.OriginalColor
    		} else if fontColor != [3]int{255, 255, 255} {
    			tempAscii += char.SetColor
    		} else {
    			tempAscii += char.Simple
    		}
    	}

    	ascii = append(ascii, tempAscii)
    }

    return ascii

}

// Returns path with the file name concatenated to it
func getFullSavePath(imageName, saveFilePath string) (string, error) {
savePathLastChar := string(saveFilePath[len(saveFilePath)-1])

    // Check if path is closed with appropriate path separator (depending on OS)
    if savePathLastChar != string(os.PathSeparator) {
    	saveFilePath += string(os.PathSeparator)
    }

    // If path exists
    if _, err := os.Stat(saveFilePath); !os.IsNotExist(err) {
    	return saveFilePath + imageName, nil
    } else {
    	return "", err
    }

}

func isURL(urlString string) bool {
if len(urlString) < 8 {
return false
} else if urlString[:7] == "http://" || urlString[:8] == "https://" {
return true
}
return false
}

// Following is for clearing screen when showing gif
var clear map[string]func()

func init() {
clear = make(map[string]func())
clear["linux"] = func() {
cmd := exec.Command("clear")
cmd.Stdout = os.Stdout
cmd.Run()
}
clear["windows"] = func() {
cmd := exec.Command("cmd", "/c", "cls")
cmd.Stdout = os.Stdout
cmd.Run()
}
clear["darwin"] = clear["linux"]
}

func clearScreen() {
value, ok := clear[runtime.GOOS]
if ok {
value()
} else {
fmt.Println("Error: your platform is unsupported, terminal can't be cleared")
os.Exit(0)
}
}

func isInputFromPipe() bool {
fileInfo, \_ := os.Stdin.Stat()
return fileInfo.Mode()&os.ModeCharDevice == 0
}

================================================
FILE: aic_package/vars.go
================================================
/\*
Copyright © 2021 Zoraiz Hassan <hzoraiz8@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
\*/

package aic_package

type Flags struct {
// Set dimensions of ascii art. Accepts a slice of 2 integers
// e.g. []int{60,30}.
// This overrides Flags.Width and Flags.Height
Dimensions []int

    // Set width of ascii art while calculating height from aspect ratio.
    // Setting this along with Flags.Height will throw an error
    Width int

    // Set height of ascii art while calculating width from aspect ratio.
    // Setting this along with Flags.Width will throw an error
    Height int

    // Use set of 69 characters instead of the default 10
    Complex bool

    // Path to save ascii art .txt file
    SaveTxtPath string

    // Path to save ascii art .png file
    SaveImagePath string

    // Path to save ascii art .gif file, if gif is passed
    SaveGifPath string

    // Invert ascii art character mapping as well as colors
    Negative bool

    // Keep colors from the original image. This uses the True color codes for
    // the terminal and will work on saved .png and .gif files as well.
    // This overrides Flags.Grayscale and Flags.FontColor
    Colored bool

    // If Flags.Colored, Flags.Grayscale or Flags.FontColor is set, use that color
    // on each character's background in the terminal
    CharBackgroundColor bool

    // Keep grayscale colors from the original image. This uses the True color
    // codes for the terminal and will work on saved .png and .gif files as well
    // This overrides Flags.FontColor
    Grayscale bool

    // Pass custom ascii art characters as a string.
    // e.g. " .-=+#@".
    // This overrides Flags.Complex
    CustomMap string

    // Flip ascii art horizontally
    FlipX bool

    // Flip ascii art vertically
    FlipY bool

    // Use terminal width to calculate ascii art size while keeping aspect ratio.
    // This overrides Flags.Dimensions, Flags.Width and Flags.Height
    Full bool

    // File path to a font .ttf file to use when saving ascii art gif or png file.
    // This will be ignored if Flags.SaveImagePath or Flags.SaveGifPath are not set
    FontFilePath string

    // Font RGB color for terminal display and saved png or gif files.
    FontColor [3]int

    // Background RGB color in saved png or gif files.
    // This will be ignored if Flags.SaveImagePath or Flags.SaveGifPath are not set
    SaveBackgroundColor [4]int

    // Use braille characters instead of ascii. Terminal must support UTF-8 encoding.
    // Otherwise, problems may be encountered with colored or even uncolored braille art.
    // This overrides Flags.Complex and Flags.CustomMap
    Braille bool

    // Threshold for braille art if Flags.Braille is set to true. Value provided must
    // be between 0 and 255. Ideal value is 128.
    // This will be ignored if Flags.Braille is not set
    Threshold int

    // Apply FloydSteinberg dithering on an image before ascii conversion. This option
    // is meant for braille art. Therefore, it will be ignored if Flags.Braille is false
    Dither bool

    // If Flags.SaveImagePath, Flags.SaveTxtPath or Flags.SaveGifPath are set, then don't
    // print on terminal
    OnlySave bool

}

var (
dimensions []int
width int
height int
complex bool
saveTxtPath string
saveImagePath string
saveGifPath string
grayscale bool
negative bool
colored bool
colorBg bool
customMap string
flipX bool
flipY bool
full bool
fontPath string
fontColor [3]int
saveBgColor [4]int
braille bool
threshold int
dither bool
onlySave bool
inputIsGif bool
)

================================================
FILE: aic_package/winsize/readme.md
================================================

## Note

These files are just wrappers around [consolesize-go](https://github.com/nathan-fiscaletti/consolesize-go) package. For unix, they resort to terminal size calculation from stdin if stdout is not directed to terminal. For windows, they currently throw an error.

================================================
FILE: aic_package/winsize/winsize_unix.go
================================================
//go:build (unix && ignore) || !windows
// +build unix,ignore !windows

package winsize

import (
"os"
"syscall"
"unsafe"

    "github.com/nathan-fiscaletti/consolesize-go"

)

// By default, this functions calculates terminal dimensions from stdout but in case
// stdout isn't a the terminal, it'll calculate terminal dimensions from stdin. This
// functionality isn't supported for windows yet
func GetTerminalSize() (int, int, error) {

    // Check if stdout is terminal
    fileInfo, err := os.Stdout.Stat()
    if err != nil {
    	return 0, 0, err
    }

    var stdoutIsTerminal bool

    if (fileInfo.Mode() & os.ModeCharDevice) != 0 {
    	stdoutIsTerminal = true
    } else {
    	stdoutIsTerminal = false
    }

    if stdoutIsTerminal {
    	x, y := consolesize.GetConsoleSize()
    	return x, y, nil

    } else {
    	// Get size from stdin if stdout is not terminal

    	var sz struct {
    		rows    uint16
    		cols    uint16
    		xpixels uint16
    		ypixels uint16
    	}
    	_, _, _ = syscall.Syscall(syscall.SYS_IOCTL,
    		uintptr(syscall.Stdin), uintptr(syscall.TIOCGWINSZ), uintptr(unsafe.Pointer(&sz)))

    	return int(sz.cols), int(sz.rows), nil
    }

}

================================================
FILE: aic_package/winsize/winsize_windows.go
================================================
//go:build (windows && ignore) || !unix
// +build windows,ignore !unix

package winsize

import (
"fmt"

    "github.com/nathan-fiscaletti/consolesize-go"

)

// By default, this functions calculates terminal dimensions from stdout but in case
// stdout isn't a the terminal, it'll throw an error instead of panicking.
func GetTerminalSize() (int, int, error) {
x, y := consolesize.GetConsoleSize()

    if x < 1 && y < 1 {
    	return x, y, fmt.Errorf("altering stdout isn't currently supported on windows")
    } else {
    	return x, y, nil
    }

}

================================================
FILE: cmd/root.go
================================================
/\*
Copyright © 2021 Zoraiz Hassan <hzoraiz8@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
\*/

package cmd

import (
"fmt"
"os"

    "github.com/TheZoraiz/ascii-image-converter/aic_package"

    homedir "github.com/mitchellh/go-homedir"
    "github.com/spf13/cobra"
    "github.com/spf13/viper"

)

var (
// Flags
cfgFile string
complex bool
dimensions []int
width int
height int
saveTxtPath string
saveImagePath string
saveGifPath string
negative bool
formatsTrue bool
colored bool
colorBg bool
grayscale bool
customMap string
flipX bool
flipY bool
full bool
fontFile string
fontColor []int
saveBgColor []int
braille bool
threshold int
dither bool
onlySave bool

    // Root commands
    rootCmd = &cobra.Command{
    	Use:     "ascii-image-converter [image paths/urls or piped stdin]",
    	Short:   "Converts images and gifs into ascii art",
    	Version: "1.13.1",
    	Long:    "This tool converts images into ascii art and prints them on the terminal.\nFurther configuration can be managed with flags.",

    	// Not RunE since help text is getting larger and seeing it for every error impacts user experience
    	Run: func(cmd *cobra.Command, args []string) {

    		if checkInputAndFlags(args) {
    			return
    		}

    		flags := aic_package.Flags{
    			Complex:             complex,
    			Dimensions:          dimensions,
    			Width:               width,
    			Height:              height,
    			SaveTxtPath:         saveTxtPath,
    			SaveImagePath:       saveImagePath,
    			SaveGifPath:         saveGifPath,
    			Negative:            negative,
    			Colored:             colored,
    			CharBackgroundColor: colorBg,
    			Grayscale:           grayscale,
    			CustomMap:           customMap,
    			FlipX:               flipX,
    			FlipY:               flipY,
    			Full:                full,
    			FontFilePath:        fontFile,
    			FontColor:           [3]int{fontColor[0], fontColor[1], fontColor[2]},
    			SaveBackgroundColor: [4]int{saveBgColor[0], saveBgColor[1], saveBgColor[2], saveBgColor[3]},
    			Braille:             braille,
    			Threshold:           threshold,
    			Dither:              dither,
    			OnlySave:            onlySave,
    		}

    		if args[0] == "-" {
    			printAscii(args[0], flags)
    			return
    		}

    		for _, imagePath := range args {
    			if err := printAscii(imagePath, flags); err != nil {
    				return
    			}
    		}
    	},
    }

)

func printAscii(imagePath string, flags aic_package.Flags) error {

    if asciiArt, err := aic_package.Convert(imagePath, flags); err == nil {
    	fmt.Printf("%s", asciiArt)
    } else {
    	fmt.Printf("Error: %v\n", err)

    	// Because this error will then be thrown for every image path/url passed
    	// if save path is invalid
    	if err.Error()[:15] == "can't save file" {
    		fmt.Println()
    		return err
    	}
    }
    if !onlySave {
    	fmt.Println()
    }
    return nil

}

// Cobra configuration from here on

func Execute() {
if err := rootCmd.Execute(); err != nil {
fmt.Println(err)
os.Exit(1)
}
}

func init() {
cobra.OnInitialize(initConfig)

    rootCmd.PersistentFlags().SortFlags = false
    rootCmd.Flags().SortFlags = false

    // rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.ascii-image-converter.yaml)")
    rootCmd.PersistentFlags().BoolVarP(&colored, "color", "C", false, "Display ascii art with original colors\nIf 24-bit colors aren't supported, uses 8-bit\n(Inverts with --negative flag)\n(Overrides --grayscale and --font-color flags)\n")
    rootCmd.PersistentFlags().BoolVar(&colorBg, "color-bg", false, "If some color flag is passed, use that color\non character background instead of foreground\n(Inverts with --negative flag)\n(Only applicable for terminal display)\n")
    rootCmd.PersistentFlags().IntSliceVarP(&dimensions, "dimensions", "d", nil, "Set width and height for ascii art in CHARACTER length\ne.g. -d 60,30 (defaults to terminal height)\n(Overrides --width and --height flags)\n")
    rootCmd.PersistentFlags().IntVarP(&width, "width", "W", 0, "Set width for ascii art in CHARACTER length\nHeight is kept to aspect ratio\ne.g. -W 60\n")
    rootCmd.PersistentFlags().IntVarP(&height, "height", "H", 0, "Set height for ascii art in CHARACTER length\nWidth is kept to aspect ratio\ne.g. -H 60\n")
    rootCmd.PersistentFlags().StringVarP(&customMap, "map", "m", "", "Give custom ascii characters to map against\nOrdered from darkest to lightest\ne.g. -m \" .-+#@\" (Quotation marks excluded from map)\n(Overrides --complex flag)\n")
    rootCmd.PersistentFlags().BoolVarP(&braille, "braille", "b", false, "Use braille characters instead of ascii\nTerminal must support braille patterns properly\n(Overrides --complex and --map flags)\n")
    rootCmd.PersistentFlags().IntVar(&threshold, "threshold", 0, "Threshold for braille art\nValue between 0-255 is accepted\ne.g. --threshold 170\n(Defaults to 128)\n")
    rootCmd.PersistentFlags().BoolVar(&dither, "dither", false, "Apply dithering on image for braille\nart conversion\n(Only applicable with --braille flag)\n(Negates --threshold flag)\n")
    rootCmd.PersistentFlags().BoolVarP(&grayscale, "grayscale", "g", false, "Display grayscale ascii art\n(Inverts with --negative flag)\n(Overrides --font-color flag)\n")
    rootCmd.PersistentFlags().BoolVarP(&complex, "complex", "c", false, "Display ascii characters in a larger range\nMay result in higher quality\n")
    rootCmd.PersistentFlags().BoolVarP(&full, "full", "f", false, "Use largest dimensions for ascii art\nthat fill the terminal width\n(Overrides --dimensions, --width and --height flags)\n")
    rootCmd.PersistentFlags().BoolVarP(&negative, "negative", "n", false, "Display ascii art in negative colors\n")
    rootCmd.PersistentFlags().BoolVarP(&flipX, "flipX", "x", false, "Flip ascii art horizontally\n")
    rootCmd.PersistentFlags().BoolVarP(&flipY, "flipY", "y", false, "Flip ascii art vertically\n")
    rootCmd.PersistentFlags().StringVarP(&saveImagePath, "save-img", "s", "", "Save ascii art as a .png file\nFormat: <image-name>-ascii-art.png\nImage will be saved in passed path\n(pass . for current directory)\n")
    rootCmd.PersistentFlags().StringVar(&saveTxtPath, "save-txt", "", "Save ascii art as a .txt file\nFormat: <image-name>-ascii-art.txt\nFile will be saved in passed path\n(pass . for current directory)\n")
    rootCmd.PersistentFlags().StringVar(&saveGifPath, "save-gif", "", "If input is a gif, save it as a .gif file\nFormat: <gif-name>-ascii-art.gif\nGif will be saved in passed path\n(pass . for current directory)\n")
    rootCmd.PersistentFlags().IntSliceVar(&saveBgColor, "save-bg", nil, "Set background color for --save-img\nand --save-gif flags\nPass an RGBA value\ne.g. --save-bg 255,255,255,100\n(Defaults to 0,0,0,100)\n")
    rootCmd.PersistentFlags().StringVar(&fontFile, "font", "", "Set font for --save-img and --save-gif flags\nPass file path to font .ttf file\ne.g. --font ./RobotoMono-Regular.ttf\n(Defaults to Hack-Regular for ascii and\n DejaVuSans-Oblique for braille)\n")
    rootCmd.PersistentFlags().IntSliceVar(&fontColor, "font-color", nil, "Set font color for terminal as well as\n--save-img and --save-gif flags\nPass an RGB value\ne.g. --font-color 0,0,0\n(Defaults to 255,255,255)\n")
    rootCmd.PersistentFlags().BoolVar(&onlySave, "only-save", false, "Don't print ascii art on terminal\nif some saving flag is passed\n")
    rootCmd.PersistentFlags().BoolVar(&formatsTrue, "formats", false, "Display supported input formats\n")

    rootCmd.PersistentFlags().BoolP("help", "h", false, "Help for "+rootCmd.Name()+"\n")
    rootCmd.PersistentFlags().BoolP("version", "v", false, "Version for "+rootCmd.Name())

    rootCmd.SetVersionTemplate("{{printf \"v%s\" .Version}}\n")

    defaultUsageTemplate := rootCmd.UsageTemplate()
    rootCmd.SetUsageTemplate(defaultUsageTemplate + "\nCopyright © 2021 Zoraiz Hassan <hzoraiz8@gmail.com>\n" +
    	"Distributed under the Apache License Version 2.0 (Apache-2.0)\n" +
    	"For further details, visit https://github.com/TheZoraiz/ascii-image-converter\n")

}

// initConfig reads in config file and ENV variables if set.
func initConfig() {
if cfgFile != "" {
// Use config file from the flag.
viper.SetConfigFile(cfgFile)
} else {
// Find home directory.
home, err := homedir.Dir()
if err != nil {
fmt.Println(err)
os.Exit(1)
}

    	// Search config in home directory with name ".ascii-image-converter" (without extension).
    	viper.AddConfigPath(home)
    	viper.SetConfigName(".ascii-image-converter")
    }

    viper.AutomaticEnv() // read in environment variables that match

    // If a config file is found, read it in.
    if err := viper.ReadInConfig(); err == nil {
    	fmt.Println("Using config file:", viper.ConfigFileUsed())
    }

}

================================================
FILE: cmd/util.go
================================================
/\*
Copyright © 2021 Zoraiz Hassan <hzoraiz8@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
\*/

package cmd

import (
"fmt"
"path"
)

// Check input and flag values for detecting errors or invalid inputs
func checkInputAndFlags(args []string) bool {

    gifCount := 0
    gifPresent := false
    nonGifPresent := false
    pipeCharPresent := false

    for _, arg := range args {
    	extension := path.Ext(arg)

    	if extension == ".gif" {
    		gifPresent = true
    		gifCount++
    	} else {
    		nonGifPresent = true
    	}

    	if arg == "-" {
    		pipeCharPresent = true
    	}
    }

    if gifPresent && nonGifPresent && !onlySave {
    	fmt.Printf("Error: There are other inputs along with GIFs\nDue to the potential looping nature of GIFs, non-GIFs must not be supplied alongside\n\n")
    	return true
    }

    if gifCount > 1 && !onlySave {
    	fmt.Printf("Error: There are multiple GIFs supplied\nDue to the potential looping nature of GIFs, only one GIF per command is supported\n\n")
    	return true
    }

    if formatsTrue {
    	fmt.Printf("Supported input formats:\n\n" +
    		"JPEG/JPG\n" +
    		"PNG\n" +
    		"WEBP\n" +
    		"BMP\n" +
    		"TIFF/TIF\n" +
    		"GIF\n\n")
    	return true
    }

    if len(args) < 1 {
    	fmt.Printf("Error: Need at least 1 input path/url or piped input\nUse the -h flag for more info\n\n")
    	return true
    }

    if len(args) > 1 && pipeCharPresent {
    	fmt.Printf("Error: You cannot pass in piped input alongside other inputs\n\n")
    	return true
    }

    if customMap != "" && len(customMap) < 2 {
    	fmt.Printf("Need at least 2 characters for --map flag\n\n")
    	return true
    }

    if dimensions != nil {

    	numberOfDimensions := len(dimensions)
    	if numberOfDimensions != 2 {
    		fmt.Printf("Error: requires 2 dimensions, got %v\n\n", numberOfDimensions)
    		return true
    	}

    	if dimensions[0] < 1 || dimensions[1] < 1 {
    		fmt.Printf("Error: invalid values for dimensions\n\n")
    		return true
    	}
    }

    if width != 0 || height != 0 {

    	if width != 0 && height != 0 {
    		fmt.Printf("Error: both --width and --height can't be set. Use --dimensions instead\n\n")
    		return true

    	} else {

    		if width < 0 {
    			fmt.Printf("Error: invalid value for width\n\n")
    			return true
    		}

    		if height < 0 {
    			fmt.Printf("Error: invalid value for height\n\n")
    			return true
    		}

    	}

    }

    if saveBgColor == nil {
    	saveBgColor = []int{0, 0, 0, 100}
    } else {
    	bgValues := len(saveBgColor)
    	if bgValues != 4 {
    		fmt.Printf("Error: --save-bg requires 4 values for RGBA, got %v\n\n", bgValues)
    		return true
    	}

    	if saveBgColor[0] < 0 || saveBgColor[1] < 0 || saveBgColor[2] < 0 || saveBgColor[3] < 0 {
    		fmt.Printf("Error: RBG values must be between 0 and 255\n")
    		fmt.Printf("Error: Opacity value must be between 0 and 100\n\n")
    		return true
    	}

    	if saveBgColor[0] > 255 || saveBgColor[1] > 255 || saveBgColor[2] > 255 || saveBgColor[3] > 100 {
    		fmt.Printf("Error: RBG values must be between 0 and 255\n")
    		fmt.Printf("Error: Opacity value must be between 0 and 100\n\n")
    		return true
    	}
    }

    if fontColor == nil {
    	fontColor = []int{255, 255, 255}
    } else {
    	fontColorValues := len(fontColor)
    	if fontColorValues != 3 {
    		fmt.Printf("Error: --font-color requires 3 values for RGB, got %v\n\n", fontColorValues)
    		return true
    	}

    	if fontColor[0] < 0 || fontColor[1] < 0 || fontColor[2] < 0 {
    		fmt.Printf("Error: RBG values must be between 0 and 255\n\n")
    		return true
    	}

    	if fontColor[0] > 255 || fontColor[1] > 255 || fontColor[2] > 255 {
    		fmt.Printf("Error: RBG values must be between 0 and 255\n\n")
    		return true
    	}
    }

    if threshold == 0 {
    	threshold = 128
    }

    if threshold < 0 || threshold > 255 {
    	fmt.Printf("Error: threshold must be between 0 and 255\n\n")
    	return true
    }

    if dither && !braille {
    	fmt.Printf("Error: image dithering is only reserved for --braille flag\n\n")
    	return true
    }

    if (saveTxtPath == "" && saveImagePath == "" && saveGifPath == "") && onlySave {
    	fmt.Printf("Error: you need to supply one of --save-img, --save-txt or --save-gif for using --only-save\n\n")
    	return true
    }

    return false

}

================================================
FILE: image_manipulation/ascii_conversions.go
================================================
/\*
Copyright © 2021 Zoraiz Hassan <hzoraiz8@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
\*/

package image_conversions

var (
// Reference taken from http://paulbourke.net/dataformats/asciiart/
asciiTableSimple = " .:-=+_#%@"
asciiTableDetailed = " .'`^\",:;Il!i><~+\_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao_#MW&8%B@$"

    // Structure for braille dots
    BrailleStruct = [4][2]int{
    	{0x1, 0x8},
    	{0x2, 0x10},
    	{0x4, 0x20},
    	{0x40, 0x80},
    }

    BrailleThreshold uint32

)

// For each individual element of imgSet in ConvertToASCIISlice()
const MAX_VAL float64 = 255

type AsciiChar struct {
OriginalColor string
SetColor string
Simple string
RgbValue [3]uint32
}

/\*
Converts the 2D image_conversions.AsciiPixel slice of image data (each instance representing each compressed pixel of original image)
to a 2D image_conversions.AsciiChar slice

If complex parameter is true, values are compared to 70 levels of color density in ASCII characters.
Otherwise, values are compared to 10 levels of color density in ASCII characters.
\*/
func ConvertToAsciiChars(imgSet [][]AsciiPixel, negative, colored, grayscale, complex, colorBg bool, customMap string, fontColor [3]int) ([][]AsciiChar, error) {

    height := len(imgSet)
    width := len(imgSet[0])

    chosenTable := map[int]string{}

    // Turn ascii character-set string into map[int]string{} literal
    if customMap == "" {
    	var charSet string

    	if complex {
    		charSet = asciiTableDetailed
    	} else {
    		charSet = asciiTableSimple
    	}

    	for index, char := range charSet {
    		chosenTable[index] = string(char)
    	}

    } else {
    	chosenTable = map[int]string{}

    	for index, char := range customMap {
    		chosenTable[index] = string(char)
    	}
    }

    var result [][]AsciiChar

    for i := 0; i < height; i++ {

    	var tempSlice []AsciiChar

    	for j := 0; j < width; j++ {
    		value := float64(imgSet[i][j].charDepth)

    		// Gets appropriate string index from chosenTable by percentage comparisons with its length
    		tempFloat := (value / MAX_VAL) * float64(len(chosenTable))
    		if value == MAX_VAL {
    			tempFloat = float64(len(chosenTable) - 1)
    		}
    		tempInt := int(tempFloat)

    		var r, g, b int

    		if colored {
    			r = int(imgSet[i][j].rgbValue[0])
    			g = int(imgSet[i][j].rgbValue[1])
    			b = int(imgSet[i][j].rgbValue[2])
    		} else {
    			r = int(imgSet[i][j].grayscaleValue[0])
    			g = int(imgSet[i][j].grayscaleValue[1])
    			b = int(imgSet[i][j].grayscaleValue[2])
    		}

    		if negative {
    			// Select character from opposite side of table as well as turn pixels negative
    			r = 255 - r
    			g = 255 - g
    			b = 255 - b

    			// To preserve negative rgb values for saving png image later down the line, since it uses imgSet
    			if colored {
    				imgSet[i][j].rgbValue = [3]uint32{uint32(r), uint32(g), uint32(b)}
    			} else {
    				imgSet[i][j].grayscaleValue = [3]uint32{uint32(r), uint32(g), uint32(b)}
    			}

    			tempInt = (len(chosenTable) - 1) - tempInt
    		}

    		var char AsciiChar

    		asciiChar := chosenTable[tempInt]
    		char.Simple = asciiChar

    		var err error
    		if colorBg {
    			char.OriginalColor, err = getColoredCharForTerm(uint8(r), uint8(g), uint8(b), asciiChar, true)
    		} else {
    			char.OriginalColor, err = getColoredCharForTerm(uint8(r), uint8(g), uint8(b), asciiChar, false)
    		}
    		if (colored || grayscale) && err != nil {
    			return nil, err
    		}

    		// If font color is not set, use a simple string. Otherwise, use True color
    		if fontColor != [3]int{255, 255, 255} {
    			fcR := fontColor[0]
    			fcG := fontColor[1]
    			fcB := fontColor[2]

    			if colorBg {
    				char.SetColor, err = getColoredCharForTerm(uint8(fcR), uint8(fcG), uint8(fcB), asciiChar, true)
    			} else {
    				char.SetColor, err = getColoredCharForTerm(uint8(fcR), uint8(fcG), uint8(fcB), asciiChar, false)
    			}
    			if err != nil {
    				return nil, err
    			}
    		}

    		if colored {
    			char.RgbValue = imgSet[i][j].rgbValue
    		} else {
    			char.RgbValue = imgSet[i][j].grayscaleValue
    		}

    		tempSlice = append(tempSlice, char)
    	}
    	result = append(result, tempSlice)
    }

    return result, nil

}

/\*
Converts the 2D image_conversions.AsciiPixel slice of image data (each instance representing each compressed pixel of original image)
to a 2D image_conversions.AsciiChar slice

Unlike ConvertToAsciiChars(), this function calculates braille characters instead of ascii
\*/
func ConvertToBrailleChars(imgSet [][]AsciiPixel, negative, colored, grayscale, colorBg bool, fontColor [3]int, threshold int) ([][]AsciiChar, error) {

    BrailleThreshold = uint32(threshold)

    height := len(imgSet)
    width := len(imgSet[0])

    var result [][]AsciiChar

    for i := 0; i < height; i += 4 {

    	var tempSlice []AsciiChar

    	for j := 0; j < width; j += 2 {

    		brailleChar := getBrailleChar(i, j, negative, imgSet)

    		var r, g, b int

    		if colored {
    			r = int(imgSet[i][j].rgbValue[0])
    			g = int(imgSet[i][j].rgbValue[1])
    			b = int(imgSet[i][j].rgbValue[2])
    		} else {
    			r = int(imgSet[i][j].grayscaleValue[0])
    			g = int(imgSet[i][j].grayscaleValue[1])
    			b = int(imgSet[i][j].grayscaleValue[2])
    		}

    		if negative {
    			// Select character from opposite side of table as well as turn pixels negative
    			r = 255 - r
    			g = 255 - g
    			b = 255 - b

    			if colored {
    				imgSet[i][j].rgbValue = [3]uint32{uint32(r), uint32(g), uint32(b)}
    			} else {
    				imgSet[i][j].grayscaleValue = [3]uint32{uint32(r), uint32(g), uint32(b)}
    			}
    		}

    		var char AsciiChar

    		char.Simple = brailleChar

    		var err error
    		if colorBg {
    			char.OriginalColor, err = getColoredCharForTerm(uint8(r), uint8(g), uint8(b), brailleChar, true)
    		} else {
    			char.OriginalColor, err = getColoredCharForTerm(uint8(r), uint8(g), uint8(b), brailleChar, false)
    		}
    		if (colored || grayscale) && err != nil {
    			return nil, err
    		}

    		// If font color is not set, use a simple string. Otherwise, use True color
    		if fontColor != [3]int{255, 255, 255} {
    			fcR := fontColor[0]
    			fcG := fontColor[1]
    			fcB := fontColor[2]

    			if colorBg {
    				char.SetColor, err = getColoredCharForTerm(uint8(fcR), uint8(fcG), uint8(fcB), brailleChar, true)
    			} else {
    				char.SetColor, err = getColoredCharForTerm(uint8(fcR), uint8(fcG), uint8(fcB), brailleChar, false)
    			}
    			if err != nil {
    				return nil, err
    			}
    		}

    		if colored {
    			char.RgbValue = imgSet[i][j].rgbValue
    		} else {
    			char.RgbValue = imgSet[i][j].grayscaleValue
    		}

    		tempSlice = append(tempSlice, char)
    	}

    	result = append(result, tempSlice)
    }

    return result, nil

}

// Iterate through the BrailleStruct table to see which dots need to be highlighted
func getBrailleChar(x, y int, negative bool, imgSet [][]AsciiPixel) string {

    brailleChar := 0x2800

    for i := 0; i < 4; i++ {
    	for j := 0; j < 2; j++ {
    		if negative {
    			if imgSet[x+i][y+j].charDepth <= BrailleThreshold {
    				brailleChar += BrailleStruct[i][j]
    			}
    		} else {
    			if imgSet[x+i][y+j].charDepth >= BrailleThreshold {
    				brailleChar += BrailleStruct[i][j]
    			}
    		}
    	}
    }

    return string(brailleChar)

}

================================================
FILE: image_manipulation/image_conversions.go
================================================
/\*
Copyright © 2021 Zoraiz Hassan <hzoraiz8@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
\*/

package image_conversions

import (
"image"
"image/color"
)

type AsciiPixel struct {
charDepth uint32
grayscaleValue [3]uint32
rgbValue [3]uint32
}

/\*
This function shrinks the passed image according to specified or default dimensions.
Stores each pixel's grayscale and RGB values in an AsciiPixel instance to simplify
getting numeric data for ASCII character comparison.

The returned 2D AsciiPixel slice contains each corresponding pixel's values
\*/
func ConvertToAsciiPixels(img image.Image, dimensions []int, width, height int, flipX, flipY, full, isBraille, dither bool) ([][]AsciiPixel, error) {

    smallImg, err := resizeImage(img, full, isBraille, dimensions, width, height)

    if err != nil {
    	return nil, err
    }

    // We mainatin a dithered image literal along with original image
    // The colors are kept from original image
    var ditheredImage image.Image

    if isBraille && dither {
    	ditheredImage = ditherImage(smallImg)
    }

    var imgSet [][]AsciiPixel

    b := smallImg.Bounds()

    // These nested loops iterate through each pixel of resized image and get an AsciiPixel instance
    for y := b.Min.Y; y < b.Max.Y; y++ {

    	var temp []AsciiPixel
    	for x := b.Min.X; x < b.Max.X; x++ {

    		oldPixel := smallImg.At(x, y)
    		grayPixel := color.GrayModel.Convert(oldPixel)

    		r1, g1, b1, _ := grayPixel.RGBA()
    		charDepth := r1 / 257 // Only Red is needed from RGB for charDepth in AsciiPixel since they have the same value for grayscale images
    		r1 = uint32(r1 / 257)
    		g1 = uint32(g1 / 257)
    		b1 = uint32(b1 / 257)

    		if isBraille && dither {

    			// Change charDepth if image dithering is applied
    			// 		Note that neither grayscale nor original color values are changed.
    			// 		Only charDepth is kept from dithered image. This is because a
    			// 		dithered image loses its colors so it's only used to check braille
    			// 		dots' visibility

    			ditheredGrayPixel := color.GrayModel.Convert(ditheredImage.At(x, y))
    			charDepth, _, _, _ = ditheredGrayPixel.RGBA()
    			charDepth = charDepth / 257
    		}

    		// Get co1ored RGB values of original pixel for rgbValue in AsciiPixel
    		r2, g2, b2, _ := oldPixel.RGBA()
    		r2 = uint32(r2 / 257)
    		g2 = uint32(g2 / 257)
    		b2 = uint32(b2 / 257)

    		temp = append(temp, AsciiPixel{
    			charDepth:      charDepth,
    			grayscaleValue: [3]uint32{r1, g1, b1},
    			rgbValue:       [3]uint32{r2, g2, b2},
    		})

    	}
    	imgSet = append(imgSet, temp)
    }

    // This rarely affects performance since the ascii art 2D slice size isn't that large
    if flipX || flipY {
    	imgSet = reverse(imgSet, flipX, flipY)
    }

    return imgSet, nil

}

================================================
FILE: image_manipulation/util.go
================================================
/\*
Copyright © 2021 Zoraiz Hassan <hzoraiz8@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
\*/

package image_conversions

import (
"fmt"
"image"
"image/color"

    "github.com/TheZoraiz/ascii-image-converter/aic_package/winsize"
    "github.com/disintegration/imaging"
    gookitColor "github.com/gookit/color"
    "github.com/makeworld-the-better-one/dither/v2"

)

func ditherImage(img image.Image) image.Image {

    palette := []color.Color{
    	color.Black,
    	color.White,
    }

    d := dither.NewDitherer(palette)
    d.Matrix = dither.FloydSteinberg

    return d.DitherCopy(img)

}

func resizeImage(img image.Image, full, isBraille bool, dimensions []int, width, height int) (image.Image, error) {

    var asciiWidth, asciiHeight int
    var smallImg image.Image

    imgWidth := float64(img.Bounds().Dx())
    imgHeight := float64(img.Bounds().Dy())
    aspectRatio := imgWidth / imgHeight

    if full {
    	terminalWidth, _, err := winsize.GetTerminalSize()
    	if err != nil {
    		return nil, err
    	}

    	asciiWidth = terminalWidth - 1
    	asciiHeight = int(float64(asciiWidth) / aspectRatio)
    	asciiHeight = int(0.5 * float64(asciiHeight))

    } else if (width != 0 || height != 0) && len(dimensions) == 0 {
    	// If either width or height is set and dimensions aren't given

    	if width != 0 && height == 0 {
    		// If width is set and height is not set, use width to calculate aspect ratio

    		asciiWidth = width
    		asciiHeight = int(float64(asciiWidth) / aspectRatio)
    		asciiHeight = int(0.5 * float64(asciiHeight))

    		if asciiHeight == 0 {
    			asciiHeight = 1
    		}

    	} else if height != 0 && width == 0 {
    		// If height is set and width is not set, use height to calculate aspect ratio

    		asciiHeight = height
    		asciiWidth = int(float64(asciiHeight) * aspectRatio)
    		asciiWidth = int(2 * float64(asciiWidth))

    		if asciiWidth == 0 {
    			asciiWidth = 1
    		}

    	} else {
    		return nil, fmt.Errorf("error: both width and height can't be set. Use dimensions instead")
    	}

    } else if len(dimensions) == 0 {
    	// This condition calculates aspect ratio according to terminal height

    	terminalWidth, terminalHeight, err := winsize.GetTerminalSize()
    	if err != nil {
    		return nil, err
    	}

    	asciiHeight = terminalHeight - 1
    	asciiWidth = int(float64(asciiHeight) * aspectRatio)
    	asciiWidth = int(2 * float64(asciiWidth))

    	// If ascii width exceeds terminal width, change ratio with respect to terminal width
    	if asciiWidth >= terminalWidth {
    		asciiWidth = terminalWidth - 1
    		asciiHeight = int(float64(asciiWidth) / aspectRatio)
    		asciiHeight = int(0.5 * float64(asciiHeight))
    	}

    } else {
    	// Else, set passed dimensions

    	asciiWidth = dimensions[0]
    	asciiHeight = dimensions[1]
    }

    // Because one braille character has 8 dots (4 rows and 2 columns)
    if isBraille {
    	asciiWidth *= 2
    	asciiHeight *= 4
    }
    smallImg = imaging.Resize(img, asciiWidth, asciiHeight, imaging.Lanczos)

    return smallImg, nil

}

func reverse(imgSet [][]AsciiPixel, flipX, flipY bool) [][]AsciiPixel {

    if flipX {
    	for _, row := range imgSet {
    		for i, j := 0, len(row)-1; i < j; i, j = i+1, j-1 {
    			row[i], row[j] = row[j], row[i]
    		}
    	}
    }

    if flipY {
    	for i, j := 0, len(imgSet)-1; i < j; i, j = i+1, j-1 {
    		imgSet[i], imgSet[j] = imgSet[j], imgSet[i]
    	}
    }

    return imgSet

}

var termColorLevel string = gookitColor.TermColorLevel().String()

// This functions calculates terminal color level between rgb colors and 256-colors
// and returns the character with escape codes appropriately
func getColoredCharForTerm(r, g, b uint8, char string, background bool) (string, error) {
var coloredChar string

    if termColorLevel == "millions" {
    	colorRenderer := gookitColor.RGB(uint8(r), uint8(g), uint8(b), background)
    	coloredChar = colorRenderer.Sprintf("%v", char)

    } else if termColorLevel == "hundreds" {
    	colorRenderer := gookitColor.RGB(uint8(r), uint8(g), uint8(b), background).C256()
    	coloredChar = colorRenderer.Sprintf("%v", char)

    } else {
    	return "", fmt.Errorf("your terminal supports neither 24-bit nor 8-bit colors. Other coloring options aren't available")
    }

    return coloredChar, nil

}
