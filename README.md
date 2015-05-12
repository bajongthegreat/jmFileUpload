# jmFileUpload - jQuery Multi-file AJAX File Upload

jmFileUpload is a simple to setup jQuery File Upload Plugin. The plugin  depends on Bootstrap 3.0 for the styling but you can alter it to suit your needs. Without further ado, Let's start on how to setup the plugin.

#Features
* Multi-file upload
* Progress bars
* Supports file type validation
* Supports callback functions before and after upload


Below your <head>:

```
<!-- Bootstrap -->
<link href="css/bootstrap.min.css" rel="stylesheet">
```


Before </body>:
```
 <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
 <script src="http://localhost/js/jquery.min.js"></script>
 <!-- Include all compiled plugins (below), or include individual files as needed -->
 <script src="http://localhost/js/bootstrap.min.js"></script>
 <!-- The jmFileUpload Plugin -->
 <script src="jmFileUpload.js"></script>
 ```


#Usage

To use the plugin, get the class or id of an element and wrap it inside $().jmFileUpload();

See example below:

```
	<script>

		(function(){
			
			$('#file').jmFileUpload({
				url : '/upload',
				callbackBeforeUpload: function(data) {
					console.log('Before upload...');
				},
				callbackAfterUpload: function(data) {
					console.log('After Upload');	
				}
			});

		})()
	</script>
```
