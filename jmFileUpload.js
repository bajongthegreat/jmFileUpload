/**
 * jmFileUpload.js
 * Version: 1
 * URL: http://github.com/bajongthegreat
 * Description: This lets javascript upload files with progressbar.
 * Requires: jQuery, xhr2
 * Author: James Mones
 * Copyright: Copyright 2014 James Mones
 */


;(function($, document, window, undefined) {
    // Optional, but considered best practice by some
    "use strict";

  

    $.fn.jmFileUpload = function(options) {

        // Default options for the plugin as a simple object
        var defaults = {
            allowedTypes: [],
            progressbarContainer: '.progress',
            progressbar: '.progress-bar',
            xhrReponseContainer: '.result',
            type: 'POST',
            url: '?a=upload',
            customData: {},
            status: '.status',
            imageContainer: '.image',
            callbackBeforeUpload: function(){},
            callbackAfterUpload: function(){},


        };

        // Get current element
        var element = this;

        // Merge the options given by the user with the defaults
        options = $.extend({}, defaults, options);

        $(options.progressbarContainer).hide();


        // Validates the file filetype
        function validate(fileType) {
            
            var doesExist = false;

            if ( in_array(fileType, options.allowedTypes) === true || options.allowedTypes.length == 0) {
                doesExist = true;
            }

            return doesExist;
        }
        function setStatus(msg, state) {
            status = '<div class="alert alert-' + state +'">' + msg + '</div>';

              $(options.status).html(status);
        }
        function sendData(data, i) {

            // Show progressbar
            $(options.progressbarContainer).show();

             var xhr = new XMLHttpRequest();
                
            xhr.open(options.type, options.url);
            
            // Success
            xhr.onload = function () {

            if (xhr.status === 200) {
                console.log('all done: ' + xhr.status);
            } else {
                    console.log('Something went terribly wrong...');
             }

            };

            xhr.upload.onprogress = function (event) {

                
                // Checks if the file's length is computable
                 if (event.lengthComputable) {
                    var complete = (event.loaded / event.total * 100 | 0);

                    // Show the current progress on the specified progress bar element
                    $(options.progressbar + "_" + i).css('width', complete+'%').html(complete + "%");
                    $(  ".pb_" + i).css('width', complete+'%').html(complete + "%");

                    setStatus('Please wait while we are uploading the file... ' + complete +' % complete', 'info');

                    if (complete == 100) {
                        setTimeout(function() {
                            $('.pb_' + i).parent().hide();
                        }, 250);
                         
                    }
                }
            };

            xhr.onload = function () {
             var result = xhr.response;

             if (!result) {
                $(options.status).html('Failed to process uploaded file.');
             } else {
                setStatus('File uploaded.', 'success');
             }

             // Parse as JSON result
             result = JSON.parse(result);

             $('.pb_title_' + i).html('<a href="' + result.file_location + '">' + result.file_name + "</a>");

             // call the callback and apply the scope:
             options.callbackAfterUpload.call(this,result);

             $(options.responseContainer).val(result.file_path).change();
             };

             xhr.send(data);

        }

         // When the file element selects a file, trigger a change event
         this.on('change', function(e) {

            var files = this.files;

            for (var i = 0; i < files.length; i++) {

                var file_name = e.target.files[i].name;

                $('.progress-container').append('<h5 class="' + 'pb_title_' + i +'">' + e.target.files[i].name + '</h5>' + '<div class="progress"><div class="progress-bar pb_' + i +'" role="progressbar"  style="width: 60%;"><span class="sr-only">60% Complete</span></div></div>');
                
            
                // Get the file type of the selected file
                var fileType = e.target.files[i].type;

                 setStatus('Fetching file type... ', 'info');

                // Get the files attribute of the selected file
                var file = $(this).prop('files')[i];

                var formData = new FormData();
           
                // Terminate event if doesnt match the required file types
                if (validate(fileType) === false) {
                    console.log(fileType);
                    setStatus('File type not supported. Please choose another file. ', 'danger');
                    return false;
                } else {
                    // Reset progress bar values
                     $(options.progressbar).css('width', 0+'%').html(0 + "%");

                    // Append file to Formdata
                    formData.append('file',file);
                    
                    // Add custom parameters to formData
                    $.each(options.customData, function(key,value) {
                        formData.append(key, value);
                    });

                setStatus('Preparing for upload... ', 'info');

                 // call the callback and apply the scope:
                options.callbackBeforeUpload.call(this);

                setStatus('Performing some operations...', 'info');

                // Make an AJAX request with the formData
                sendData(formData, i); 
                               
                }
            }

           
         });

        return this;

    };

    // Private function that is only called by the plugin
    // Emulate PHP in_array function in Javascript
            var in_array = function(type, allowedTypes) {
                var found = false;

                for (var i = allowedTypes.length - 1; i >= 0; i--) {
                    if (allowedTypes[i] == type) {
                        found = true;
                    }
                };

                return found;
            }


})(jQuery, document, window);