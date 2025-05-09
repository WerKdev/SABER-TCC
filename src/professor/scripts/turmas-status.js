document.addEventListener("DOMContentLoaded", function() {
            
    const sidebar = document.getElementById("sidebar");
    const menuIconSidebar = document.getElementById("menu-icon");

    menuIconSidebar.addEventListener("click", function() {
        sidebar.classList.toggle("active");
    });

    const menuIconMobile = document.getElementById("menu-icon-mobile");

    menuIconMobile.addEventListener("click", function() {
        sidebar.classList.toggle("active"); 
    });

    const notificationsIcon = document.getElementById("notifications-icon");
    const notificationsPopup = document.getElementById("notifications-popup");
    
    notificationsIcon.addEventListener("click", function(event) {
        notificationsPopup.style.display = 
            (notificationsPopup.style.display === "none" || notificationsPopup.style.display === "") ? "block" : "none";
        event.stopPropagation();
    });

    document.addEventListener("click", function(event) {
        if (!notificationsPopup.contains(event.target) && event.target !== notificationsIcon) {
            notificationsPopup.style.display = "none";
        }
    });

    const userIcon = document.getElementById("user-icon");
    const userIconPopup = document.getElementById("user-icon-popup");

    userIcon.addEventListener("click", function(event) {
        userIconPopup.style.display = 
            (userIconPopup.style.display === "none" || userIconPopup.style.display === "") ? "block" : "none";
        event.stopPropagation();
    });

    document.addEventListener("click", function(event) {
        if (!userIconPopup.contains(event.target) && event.target !== userIcon) {
            userIconPopup.style.display = "none";
        }
    });

    function checkWindowSize() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove("active");
        }
    }

    window.addEventListener("resize", checkWindowSize);
    checkWindowSize(); 
});