<div class="card">
  <img src="" id="img-preview" height = "450" width = "400" name = "picture"/>
  <label class="file-upload-container" for="file-upload">
    <input id="file-upload" type="file" style="display:none;">

    <br />
    Upload an Image
  </label>
</div>

<script>
var cloudinary_url = 'https://api.cloudinary.com/v1_1/programbao/upload'
var cloudinary_upload_preset = 'wasukyop'
var imgPreview = document.getElementById('img-preview')
var fileUpload = document.getElementById('file-upload')


fileUpload.addEventListener('change', function (event){
 var file = event.target.files[0]
 var formData = new FormData()
 formData.append('file', file)
 formData.append('upload_preset', cloudinary_upload_preset)
 axios({
   url: cloudinary_url,
   method: 'POST',
   headers: {
     'Content-Type': 'application/x-www-form-urlencoded'
   },
   data: formData
 }).then(function(res){
   imgPreview.src = res.data.secure_url
 }).catch(function(err){
   console.error(err)
 })
})

</script>
