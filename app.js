class FlashCardApp {
    constructor() {
        this.cards = [];
        this.currentIndex = 0;
        this.isRandom = false;
        this.randomIndices = [];
        this.currentDeck = 'beginner';

        // DOM Elements
        this.flashcard = document.querySelector('.flashcard');
        this.questionEl = document.querySelector('.question');
        this.answerEl = document.querySelector('.answer');
        this.currentCardEl = document.getElementById('currentCard');
        this.totalCardsEl = document.getElementById('totalCards');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        this.deckButtons = document.querySelectorAll('[data-deck]');

        // Bind event listeners
        this.bindEvents();
        
        // Load initial deck
        this.loadDeck(this.currentDeck);
    }

    bindEvents() {
        document.getElementById('prevBtn').addEventListener('click', () => this.prevCard());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextCard());
        document.getElementById('flipBtn').addEventListener('click', () => this.flipCard());
        this.shuffleBtn.addEventListener('click', () => this.toggleRandom());

        // Deck switching
        this.deckButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const deck = e.target.dataset.deck;
                this.loadDeck(deck);
                this.updateActiveDeckButton(deck);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    this.prevCard();
                    break;
                case 'ArrowRight':
                    this.nextCard();
                    break;
                case ' ':
                    e.preventDefault();
                    this.flipCard();
                    break;
            }
        });
    }

    async loadDeck(deckName) {
        try {
            const response = await fetch(`Data/${deckName}.json`);
            const data = await response.json();
            this.cards = data.flashcards;
            this.currentIndex = 0;
            this.randomIndices = [];
            
            // Reset random state
            this.isRandom = false;
            this.shuffleBtn.classList.remove('active');
            
            // Update UI
            this.updateCard();
            this.updateProgress();
            
            // Save current deck to session storage
            sessionStorage.setItem('currentDeck', deckName);
            
            // Update active deck button
            this.updateActiveDeckButton(deckName);
        } catch (error) {
            console.error('Error loading deck:', error);
            this.questionEl.textContent = 'Error loading deck';
            this.answerEl.textContent = 'Please try again';
        }
    }

    updateActiveDeckButton(deckName) {
        this.deckButtons.forEach(button => {
            if (button.dataset.deck === deckName) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    updateCard() {
        if (this.cards.length === 0) return;

        const index = this.isRandom ? this.randomIndices[this.currentIndex] : this.currentIndex;
        const card = this.cards[index];

        this.questionEl.textContent = card.question;
        this.answerEl.textContent = card.answer;
        this.flashcard.classList.remove('is-flipped');
        this.updateProgress();
    }

    updateProgress() {
        this.currentCardEl.textContent = this.currentIndex + 1;
        this.totalCardsEl.textContent = this.cards.length;
    }

    nextCard() {
        if (this.currentIndex < this.cards.length - 1) {
            this.currentIndex++;
            this.updateCard();
        }
    }

    prevCard() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCard();
        }
    }

    flipCard() {
        this.flashcard.classList.toggle('is-flipped');
    }

    toggleRandom() {
        this.isRandom = !this.isRandom;
        this.shuffleBtn.classList.toggle('active');
        
        if (this.isRandom) {
            this.randomIndices = Array.from({length: this.cards.length}, (_, i) => i);
            for (let i = this.randomIndices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.randomIndices[i], this.randomIndices[j]] = 
                [this.randomIndices[j], this.randomIndices[i]];
            }
        }
        
        this.currentIndex = 0;
        this.updateCard();
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FlashCardApp();
}); 