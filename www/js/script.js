// 1. Layer Selection
const bgLayer = document.getElementById('layer-bg');
const midLayer = document.getElementById('layer-mid');
const frontLayer = document.getElementById('layer-front');

// 2. Parallax & Fade Logic
function applyParallax() {
    if (window.innerWidth > 768) {
        const scrollY = window.scrollY;
        const screenHeight = window.innerHeight;

        // Background moves slowly
        if (bgLayer) bgLayer.style.transform = `translateY(${scrollY * 0.15}px)`;
        
        // Mid (Disk) moves medium, stays at scale 0.7
        if (midLayer) midLayer.style.transform = `scale(0.7) translateX(15%) translateY(${scrollY * 0.25}px)`;
        
        // Front (Lady) moves fastest ascending
        if (frontLayer) frontLayer.style.transform = `scale(0.7) translateX(15%) translateY(-${scrollY * 0.1}px)`;

        // Fade Out for Lady only
        let womanOpacity = 1 - (scrollY / (screenHeight * 0.5));
        womanOpacity = Math.max(0, Math.min(1, womanOpacity));
        if (frontLayer) frontLayer.style.opacity = womanOpacity;
    }
}

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            applyParallax();
            ticking = false;
        });
        ticking = true;
    }
});

// 3. Travel Calculator Logic (1s per 50km)
const cities = {
    "tel aviv": { lat: 32.0853, lon: 34.7818 },
    "new york": { lat: 40.7128, lon: -74.0060 },
    "london": { lat: 51.5074, lon: -0.1278 },
    "paris": { lat: 48.8566, lon: 2.3522 },
    "tokyo": { lat: 35.6762, lon: 139.6503 }
};

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

const calcButton = document.querySelector('#travelCalculator button');
if (calcButton) {
    calcButton.addEventListener('click', () => {
        const valA = document.getElementById('locationA').value.trim().toLowerCase();
        const valB = document.getElementById('locationB').value.trim().toLowerCase();
        const timeDisplay = document.getElementById('time-display');
        const mapDisplay = document.getElementById('map-display');

        if (!valA || !valB) {
            timeDisplay.innerText = "Error";
            return;
        }

        timeDisplay.innerText = "...";
        mapDisplay.innerHTML = "Scanning quantum entanglement...";

        setTimeout(() => {
            let distance = 0;
            if (cities[valA] && cities[valB]) {
                distance = getDistance(cities[valA].lat, cities[valA].lon, cities[valB].lat, cities[valB].lon);
            } else {
                distance = Math.floor(Math.random() * 8000 + 500);
            }

            const time = (distance / 50).toFixed(1);
            timeDisplay.innerText = time + "s";
            mapDisplay.innerHTML = `✓ Distance: ${Math.round(distance)} km<br>Route Stable.`;
        }, 1200);
    });
}

// --- How It Works Reveal Animation ---

const observerOptions = {
    threshold: 0.2 // האנימציה תתחיל כש-20% מהסקשן נראה
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // מוצא את כל הכרטיסיות בתוך הסקשן
            const cards = entry.target.querySelectorAll('.step-card');
            
            cards.forEach((card, index) => {
                // נותן לכל כרטיסייה "דיליי" שונה לפי המיקום שלה
                setTimeout(() => {
                    card.classList.add('appear');
                }, index * 200); // 200 מילי-שניות הפרש בין אחד לשני
            });
            
            // מפסיק לצפות בסקשן אחרי שהאנימציה קרתה פעם אחת
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// מתחילים לצפות בסקשן
const howItWorksSection = document.getElementById('how-it-works');
if (howItWorksSection) {
    observer.observe(howItWorksSection);
}

document.addEventListener('DOMContentLoaded', function() {
    // 1. בחירת האלמנטים מה-HTML שלך
    const calcBtn = document.querySelector('#travelCalculator button');
    const timeDisplay = document.getElementById('time-display');
    const inputA = document.getElementById('locationA');
    const inputB = document.getElementById('locationB');

    if (calcBtn) {
        calcBtn.addEventListener('click', function(e) {
            // 2. מניעת קפיצת הדף למעלה (ה-Fix הקריטי)
            e.preventDefault();

            // בדיקה קטנה שהמשתמש הזין משהו (אופציונלי)
            if (inputA.value === "" || inputB.value === "") {
                timeDisplay.innerText = "--:--";
                return;
            }

            // 3. אפקט טעינה ויזואלי - יוצר תחושה של חישוב
            timeDisplay.style.opacity = '0.3';
            timeDisplay.innerText = "SYNC...";

            setTimeout(() => {
                // 4. יצירת זמן אקראי בין 0.0010 ל-0.0045 שניות
                // הסטודנט להנדסה שבי בטח היה אומר שזה תלוי מרחק, 
                // אבל בשביל הרושם - מספר רנדומלי עושה עבודה מעולה.
                const randomTime = (Math.random() * (5.0045 - 0.5010) + 0.5010).toFixed(4);
                
                // 5. הצגת התוצאה
                timeDisplay.innerText = randomTime + "s";
                timeDisplay.style.opacity = '1';
                
                // אפקט זוהר קטן ברגע הופעת התוצאה
                timeDisplay.style.textShadow = "0 0 15px rgba(0, 240, 255, 0.5)";
            }, 500); // חצי שנייה של "חישוב"
        });
    }
});