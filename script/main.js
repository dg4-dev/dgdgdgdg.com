document.downloadImage = () => {
  const profileElement = document.querySelector('#profile');
  const canvasElement = document.querySelector('#canvas');
  const linkElement = document.querySelector('#dl-link');

  html2canvas(profileElement).then(canvas => {
    canvasElement.src = canvas.toDataURL();
    linkElement.href = canvas.toDataURL('image/png');
    linkElement.download = 'profile.png';
    linkElement.click();
  });
};

function previewImage(obj)
{
	var fileReader = new FileReader();
	fileReader.onload = (function() {
		document.getElementById('preview').src = fileReader.result;
	});
	fileReader.readAsDataURL(obj.files[0]);
}