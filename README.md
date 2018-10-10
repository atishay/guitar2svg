guitar2svg
---------

Guitar Chords/Notes to SVG converter using [Jtab](http://jtab.tardate.com/). Provides URL based SVG conversion so that it can be cached on the server. Used as a part for my [Hugo](gohugo.io/) based website using the following shortcode.

```Go
<!-- guitar -->
{{- $json := getJSON $.Site.Params.Guitar "?" (querify "q" .Inner) -}}
{{- with $json.svg -}}
{{. | safeHTML}}
{{- end -}}
```
