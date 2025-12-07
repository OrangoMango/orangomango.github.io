const adventureData = {
    'summer2025': {
        title: "Summer 2025",
        video: "nZk2C0IJ6hc",
        desc: "Highlights from my travels during the summer of 2025, featuring Marina di Pisa, Vienna, Bratislava, Castiglioncello, and more.",
        imageCount: 11
    },
    'malbacco': {
        title: "Malbacco",
        video: "U3UndRqbc1M",
        desc: "My second 100km ride to Malbacco (LU), a location known for its stunning natural pools.",
        imageCount: 6,
        komootId: "2624347631",
        coords: "43.9845,10.2185"
    },
    'schneeberg': {
        title: "Schneeberg",
        video: "_CcHoO94nms",
        desc: "Located near Puchberg, the Schneeberg Klosterwappen (2076m) is the highest peak in the entire mountain range.",
        imageCount: 5,
        komootId: "2550281878",
        coords: "47.7671,15.8056"
    },
    'cesenatico': {
        title: "Cesenatico",
        video: "g369ApLdvbA",
        desc: "A coastal town located on the Adriatic Sea, on the eastern side of Italy.",
        imageCount: 6,
        coords: "44.2007,12.3934"
    },
    'quercianella': {
        title: "Quercianella",
        video: "VjxLfYZw9Ak",
        desc: "The destination of my first 100km bike ride. Quercianella (LI) is a beautiful seaside village just south of Livorno.",
        imageCount: 4,
        komootId: "2189329940",
        coords: "43.4697,10.3743"
    },
    'verruca': {
        title: "Rocca della Verruca",
        video: "EyK2YEURmTs",
        desc: "A historic fortress located on the top of a mountain overlooking Calci (PI).",
        imageCount: 2,
        komootId: "1662620187",
        coords: "43.7126,10.5363"
    },
    'podersdorf': {
        title: "Podersdorf am See",
        video: "GWoq9KPEE0o",
        desc: "The famous lighthouse on the shores of the vast Lake Neusiedl (Neusiedler See) in Austria.",
        imageCount: 3,
        coords: "47.8596,16.8361"
    },
    'barcellona': {
        title: "Barcelona",
        video: "jhimTUTofag",
        desc: "A major Spanish city showcasing iconic landmarks like the Sagrada Família, Park Güell, and the famous La Rambla boulevard.",
        imageCount: 6,
        coords: "41.3851,2.1734"
    },
    'caprona': {
        title: "Torretta di Caprona",
        video: "Ps1jJUxsJXI",
        desc: "A distinctive tower standing on top of a hill in Caprona, near Calci (PI).",
        imageCount: 2,
        komootId: "1990644161",
        coords: "43.7061,10.5614"
    },
    'marina': {
        title: "Marina di Pisa",
        video: "14ej2F2GmDs",
        desc: "The beautiful seaside area of Pisa, accessible via a 15km bike path from the city center.",
        imageCount: 6,
        komootId: "2137786473",
        coords: "43.6702,10.2764"
    },
    'monteprana': {
        title: "Monte Prana",
        video: "Iw_DbQoY6_I",
        desc: "Monte Prana is a peak rising 1200m above sea level, located near Viareggio (LU).",
        imageCount: 3,
        komootId: "2604757229",
        coords: "43.9404,10.3402"
    },
    'pisa': {
        title: "Pisa",
        video: "RurEFHm84rQ",
        desc: "A collection of highlights from around Pisa's historic city center.",
        imageCount: 6,
        coords: "43.7228,10.4017"
    },
    'lucca': {
        title: "Lucca",
        video: "DwbluJCr7UM",
        desc: "Highlights from the center of Lucca, a historic city located just over Monte Serra from Pisa.",
        imageCount: 3,
        komootId: "1839401017",
        coords: "43.8429,10.5027"
    }
};

let currentDetailId = null;
let currentLightboxIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    const scrollBtn = document.getElementById('scroll-to-top-btn');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.remove('translate-y-20', 'opacity-0');
            } else {
                scrollBtn.classList.add('translate-y-20', 'opacity-0');
            }
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    if (document.getElementById('detail-title')) {
        loadAdventureDetail();
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function loadAdventureDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id || !adventureData[id]) {
        document.getElementById('detail-title').innerText = "Adventure Not Found";
        return;
    }

    currentDetailId = id;
    const data = adventureData[id];

    // Populate Text Data
    document.getElementById('detail-title').innerText = data.title;
    document.getElementById('detail-description').innerText = data.desc;
    
    const descriptionElement = document.getElementById('detail-description');
    const parentDiv = descriptionElement.parentNode;
    const oldBtn = document.getElementById('komoot-btn');
    if (oldBtn) oldBtn.remove();

    if (data.komootId) {
        const komootBtn = document.createElement('a');
        komootBtn.id = 'komoot-btn';
        komootBtn.href = `https://www.komoot.com/tour/${data.komootId}`;
        komootBtn.target = "_blank";
        komootBtn.className = "inline-flex items-center mt-6 px-6 py-3 rounded-lg bg-[#93bf33]/10 text-[#93bf33] border border-[#93bf33]/20 font-semibold hover:bg-[#93bf33] hover:text-black transition-all";
        komootBtn.innerHTML = 'View Tour on Komoot <i class="fas fa-map-marked-alt ml-2"></i>';
        
        parentDiv.appendChild(komootBtn);
    }

    // Update Video
    document.getElementById('detail-video-container').innerHTML = 
        `<div class="video-container"><iframe src="https://www.youtube.com/embed/${data.video}" title="${data.title}" frameborder="0" allowfullscreen></iframe></div>`;

    // Update Map
    let mapHTML = '';
    if (data.coords) {
        mapHTML = `<iframe width="100%" height="100%" frameborder="0" style="border:0" src="https://maps.google.com/maps?q=${data.coords}&z=10&output=embed" allowfullscreen></iframe>`;
    } else {
        mapHTML = '<div class="w-full h-full flex items-center justify-center text-slate-500">Map unavailable</div>';
    }
    document.getElementById('detail-map').innerHTML = mapHTML;

    // Generate Photo Grid
    const grid = document.getElementById('detail-grid');
    grid.innerHTML = '';
    for(let i=0; i<data.imageCount; i++) {
        const imgSrc = `assets/images/drone/${id}/${i}.JPG`;
        grid.innerHTML += `
            <div class="aspect-video bg-slate-800 rounded-lg overflow-hidden border border-slate-700/50 relative group cursor-pointer" onclick="openLightbox(${i})">
                <img src="${imgSrc}" alt="Gallery Image ${i}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <i class="fas fa-search-plus text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg scale-75 group-hover:scale-100 transform duration-300"></i>
                </div>
            </div>`;
    }
}

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (!lightbox) return;

    currentLightboxIndex = index;
    updateLightboxImage();
    
    lightbox.classList.remove('hidden');
    setTimeout(() => {
        lightbox.classList.remove('opacity-0');
        lightboxImg.classList.remove('scale-95');
        lightboxImg.classList.add('scale-100');
    }, 10);
    document.body.style.overflow = 'hidden'; 
}

function changeLightboxImage(direction) {
    if (window.event) window.event.stopPropagation();
    
    if (!currentDetailId || !adventureData[currentDetailId]) return;
    
    const data = adventureData[currentDetailId];
    
    currentLightboxIndex += direction;
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = data.imageCount - 1;
    } else if (currentLightboxIndex >= data.imageCount) {
        currentLightboxIndex = 0;
    }
    
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImg = document.getElementById('lightbox-img');
    const src = `assets/images/drone/${currentDetailId}/${currentLightboxIndex}.JPG`;
    lightboxImg.src = src;
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (!lightbox) return;

    lightbox.classList.add('opacity-0');
    lightboxImg.classList.remove('scale-100');
    lightboxImg.classList.add('scale-95');
    
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightboxImg.src = '';
    }, 300);
    document.body.style.overflow = 'auto'; 
}

// Keyboard Listeners
document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || lightbox.classList.contains('hidden')) return;
    
    if (event.key === "Escape") {
        closeLightbox();
    } else if (event.key === "ArrowLeft") {
        changeLightboxImage(-1);
    } else if (event.key === "ArrowRight") {
        changeLightboxImage(1);
    }
});