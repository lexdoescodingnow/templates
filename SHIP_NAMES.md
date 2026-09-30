# Ship names

These names are prefilled in the editable name fields of all 868 flavour designs, including older supported layouts. The same defaults are used in collection editors, previews, forum masterposts and downloadable packs. Names and links remain editable.

| Collection | Ship members |
| --- | --- |
| [Banana](banana/) | Dom & Taein |
| [Bingsu](bingsu/) | Isaiah & Max |
| [Boba](boba/) | Hunter & Soomin |
| [Bread](bread/) | Jinseok & Lucas |
| [Brown Sugar](brown-sugar/) | Chanwoo & Taehwan |
| [Cereal](cereal/) | Hoseong & Sam |
| [Champagne](champagne/) | Jude & Toby |
| [Cheese](cheese/) | Minseo & Tommy |
| [Cherry](cherry/) | Jaehwa & Ubin |
| [Chocolate](chocolate/) | Jake & River |
| [Cinnamon](cinnamon/) | Hyunwoo & Jeremy |
| [Citron](citron/) | Ben & Vince |
| [Clementine](clementine/) | Siwoo & Yuseop |
| [Cocktail](cocktail/) | Cal & Dae |
| [Coconut](coconut/) | Dustin & Noah |
| [Cream](cream/) | Haoyu & Malachi |
| [Cucumber](cucumber/) | Tao & Zhiyuan |
| [Delight](delight/) | Eric & X |
| [Espresso](espresso/) | Jaeho & Leo |
| [Fiery](fiery/) | Asher & Hiroshi |
| [Fudge](fudge/) | Ren & Tsubasa |
| [Gateau](gateau/) | Mew & Tawin |
| [Gin](gin/) | August & Linyu |
| [Ginger](ginger/) | Aaron & Bandy |
| [Honey](honey/) | Kota & Yuki |
| [Italian Cuisine](italian-cuisine/) | Freddie & Oliver |
| [Jelly](jelly/) | Bing & Liang |
| [Lavender](lavender/) | Jinwoo & Yohan |
| [Lemon](lemon/) | Adrian & Shane |
| [Macadamia](macadamia/) | Journey & Kai |
| [Mango](mango/) | Alastair & Jiyong |
| [Marmalade](marmalade/) | Gabriel & Lucian |
| [Mocha & Latte](mocha-latte/) | Elias, Taeyang & Yujun |
| [Nectarine](nectarine/) | Akara & Clarity |
| [Nuts](nuts/) | Minharu & Taesung |
| [Oats](oats/) | Chen & Song |
| [Passionfruit](passionfruit/) | Adriel & Lewis |
| [Plum](plum/) | Jason & Mike |
| [Popcorn](popcorn/) | Caleb & Peter |
| [Portuguese Cuisine](portuguese-cuisine/) | Seojun & Wenjun |
| [Potato](potato/) | Minwoo & Phoenix |
| [Praline](praline/) | Dongmin & Yonggi |
| [Pumpkin](pumpkin/) | Dexter & Happy |
| [Raspberry](raspberry/) | Jian & Kijoon |
| [Sake](sake/) | Jett & Miles |
| [Sesame](sesame/) | Stella & Valerie |
| [Sour](sour/) | Lyle & Will |
| [Spiced](spiced/) | Hajun & Joonki |
| [Strawberry](strawberry/) | Jaehoon & Jinseok |
| [Sultana](sultana/) | Jaehyun & Kia |
| [Sweet Potato](sweet-potato/) | Danwoo & Janghoon |
| [Toffee](toffee/) | Beau & Joe |
| [Tropical](tropical/) | Davis & Theo |
| [Wine](wine/) | Casper & Micah |
| [Yuzu](yuzu/) | Cole & Jules |

Mocha is Elias & Taeyang. Latte is Taeyang & Yujun. The combined Mocha & Latte collection displays **Elias, Taeyang & Yujun**.

Strawberry is Jaehoon & Jinseok, who retain the flavour as exes. Its snippets preserve literal `[name]` and `[text]` fields at the user’s request; previews and the named-copy option show both names.

FaceTime, Petal and Traitors retain generic editable names.

## Maintenance

`ship-names.json` records the approved mapping. For an unassigned collection, add its mapping and run `python3 tools/populate_ship_names.py` to fill its name placeholders, then `python3 tools/build_forum_posts.py` to refresh the forum catalogue. The population tool fills unassigned fields; changing an already assigned ship also requires updating its existing values. Keep editor source defaults, embedded preview scripts and packaged downloads in sync.

## Verification · 27 September 2026

All 853 flavour designs show every supplied ship member as visible HTML text. All 884 canonical and alias snippet blocks differ only in their name fields. Forum copy blocks match the source snippets, and design names, ordering and styles remain unchanged. The 53 collection preview/editor pages passed 785 default-export checks. Thirteen existing validators passed; the older Plum validator could not start because its Playwright dependency was unavailable. Plum passed the shared source and editor checks. No new browser layout or live-forum posting check was performed for this text update.
