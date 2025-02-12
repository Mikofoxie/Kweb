document.addEventListener('selectstart', (e) => {
    e.preventDefault();
})


function copyDsLink() {
    const discordLink = document.querySelector('.contact__discord').textContent

    const tempInput = document.createElement('textarea');
    tempInput.value = discordLink
    document.body.appendChild(tempInput)
    
    tempInput.select();
    document.execCommand('copy')
    document.body.removeChild(tempInput)

    const toast = document.getElementById('msg__copy');
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
}
