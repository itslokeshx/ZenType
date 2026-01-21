/**
 * English Learning Exercises
 * 15 progressive exercises teaching proper typing technique
 */

export const englishExercises = [
    // ===== EXERCISES 1-3: HOME ROW FOUNDATION =====
    {
        id: 1,
        title: "Home Row Foundation",
        description: "Place your fingers on the home row. Left hand: pinky on 'a', ring on 's', middle on 'd', index on 'f'. Right hand: index on 'j', middle on 'k', ring on 'l', pinky on ';'. Keep your fingers resting gently on these keys.",
        targetLines: [
            "asdf jkl;", "asdf jkl;", "asdf jkl;", "asdf jkl;", "asdf jkl;",
            "jkl; asdf", "jkl; asdf", "jkl; asdf", "jkl; asdf", "jkl; asdf",
            "aaa sss ddd fff", "jjj kkk lll ;;;", "asdf jkl;", "jkl; asdf",
            "asdfjkl;", "asdf jkl;", "jkl; asdf", "asdf jkl;", "jkl; asdf",
            "asdf jkl;", "asdf jkl;", "asdf jkl;", "asdf jkl;", "asdf jkl;", "asdf jkl;"
        ],
        keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
        requiredAccuracy: 90
    },
    {
        id: 2,
        title: "Home Row Extended",
        description: "Add the adjacent keys 'g' and apostrophe ('). Your left index finger stretches right to 'g', and your right pinky reaches right to the apostrophe. Maintain your home position.",
        targetLines: [
            "asdfg jkl;'", "asdfg jkl;'", "asdfg jkl;'", "asdfg jkl;'", "asdfg jkl;'",
            "ggg fff", "''' ;;;", "asdfg jkl;'", "jkl;' asdfg", "asdfg jkl;'",
            "asg fgd jkl", "jkl;' asdfg", "ggg lll", "asdfg jkl;'", "jkl;' asdfg",
            "asdfg jkl;'", "asdfg jkl;'", "asdfg jkl;'", "asdfg jkl;'", "asdfg jkl;'",
            "gfds ajkl", "asdfg jkl;'", "jkl;' asdfg", "asdfg jkl;'", "asdfg jkl;'"
        ],
        keys: ['a', 's', 'd', 'f', 'g', 'j', 'k', 'l', ';', "'"],
        requiredAccuracy: 90
    },
    {
        id: 3,
        title: "Complete Home Row",
        description: "Add 'h' to complete the home row. Your right index finger moves left to press 'h'. Practice smooth transitions between all home row keys.",
        targetLines: [
            "asdfgh jkl;'", "asdfgh jkl;'", "asdfgh jkl;'", "asdfgh jkl;'",
            "hhh jjj", "ggg hhh", "asdfgh jkl;'", "jkl;' asdfgh", "asdfgh jkl;'",
            "had lad sad fad", "ash dash gash", "hall fall shall", "ask flask",
            "glad flag slag", "half calf", "asdfgh jkl;'", "jkl;' asdfgh",
            "has had shall", "flask glass", "asdfgh jkl;'", "jkl;' asdfgh",
            "asdfgh jkl;'", "asdfgh jkl;'", "asdfgh jkl;'", "asdfgh jkl;'"
        ],
        keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
        requiredAccuracy: 90
    },

    // ===== EXERCISES 4-6: UPPER ROW INTEGRATION =====
    {
        id: 4,
        title: "Upper Row Introduction",
        description: "Reach up from home row to press the upper row keys. Maintain your home position - only the typing finger should move upward, then return immediately to home row.",
        targetLines: [
            "qwert yuiop", "qwert yuiop", "qwert yuiop", "qwert yuiop", "qwert yuiop",
            "qqq www eee", "rrr ttt", "yyy uuu iii", "ooo ppp", "qwert yuiop",
            "qwe rty uio", "qwert yuiop", "yuiop qwert", "qwert yuiop",
            "qqq rrr ttt", "yyy iii ooo", "qwert yuiop", "yuiop qwert",
            "qwert yuiop", "qwert yuiop", "qwert yuiop", "qwert yuiop",
            "qwert yuiop", "qwert yuiop", "qwert yuiop"
        ],
        keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        requiredAccuracy: 90
    },
    {
        id: 5,
        title: "Home and Upper Rows Combined",
        description: "Practice moving between home row and upper row. Focus on returning your fingers to home position after each reach.",
        targetLines: [
            "asdf qwer", "jkl; yuio", "asdf qwer jkl;", "qwer asdf yuio",
            "the for you", "are was were", "that this", "your from they",
            "we he she it", "at as if or", "all out who", "her his our",
            "up so by my", "one two", "how now", "get let set",
            "see tree free", "port sort fort", "fast last past", "joke poke woke",
            "west rest test", "rope hope", "quit quite", "type hype",
            "asdf qwer jkl;", "qwer yuio asdf", "asdf qwer jkl;"
        ],
        keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        requiredAccuracy: 90
    },
    {
        id: 6,
        title: "Upper Row Word Practice",
        description: "Type real words using home and upper rows. Focus on accuracy over speed.",
        targetLines: [
            "tree port fast joke west rope", "quit type hope test",
            "your that this they were", "are the for you from",
            "we he she it at as if or", "all out who her his our",
            "up so by my one two how", "get let set see free",
            "sort fort last past poke woke", "rest hope quite hype",
            "the tree is tall", "you are fast", "they were here",
            "this is your test", "we hope you pass", "she will get it",
            "he is at the port", "it was quite fast", "all of our hope",
            "two of us will go", "how are you today", "let us see the tree"
        ],
        keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        requiredAccuracy: 90
    },

    // ===== EXERCISES 7-9: LOWER ROW INTEGRATION =====
    {
        id: 7,
        title: "Lower Row Introduction",
        description: "Reach down from home row to press the lower row keys. Keep your other fingers anchored on the home row while reaching down.",
        targetLines: [
            "zxcvb nm,./", "zxcvb nm,./", "zxcvb nm,./", "zxcvb nm,./", "zxcvb nm,./",
            "zzz xxx ccc", "vvv bbb", "nnn mmm", "zxcvb nm,./", "nm,./ zxcvb",
            "zzz nnn", "xxx mmm", "ccc ,,,", "vvv ...", "bbb ///",
            "zxcvb nm,./", "nm,./ zxcvb", "zxcvb nm,./", "nm,./ zxcvb",
            "zxcvb nm,./", "zxcvb nm,./", "zxcvb nm,./", "zxcvb nm,./",
            "zxcvb nm,./", "zxcvb nm,./"
        ],
        keys: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
        requiredAccuracy: 90
    },
    {
        id: 8,
        title: "All Three Rows Combined",
        description: "Practice moving smoothly between all three rows. Always return to home position.",
        targetLines: [
            "asdf qwer zxcv", "jkl; yuio nm,.", "asdf zxcv qwer",
            "the man can", "box mix fix", "van ban can", "zip zap zen",
            "move have save", "come some home", "name game same", "time lime dime",
            "back pack sack", "next text", "very merry", "born corn",
            "buzz fuzz", "exam example", "zone bone cone", "voice choice",
            "never clever", "oven coven", "cabin cabin", "mixer fixer",
            "asdf qwer zxcv jkl;", "the quick brown", "jump over the box"
        ],
        keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
        requiredAccuracy: 90
    },
    {
        id: 9,
        title: "Complete Alphabet Practice",
        description: "Use the full keyboard to type words with all letters. Focus on smooth, accurate typing.",
        targetLines: [
            "the quick brown fox jumps over lazy dogs",
            "pack my box with five dozen liquor jugs",
            "crazy fredrick bought many very exquisite opal jewels",
            "the five boxing wizards jump quickly",
            "how vexingly quick daft zebras jump",
            "bright vixens jump dozy fowl quack",
            "sphinx of black quartz judge my vow",
            "waltz nymph for quick jigs vex bud",
            "glib jocks quiz nymph to vex dwarf",
            "fjord bank glyphs vext quiz",
            "the quick brown fox", "jumps over the lazy dog",
            "crazy boxing wizards", "jump very quickly",
            "exquisite opal jewels", "five dozen liquor jugs"
        ],
        keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
        requiredAccuracy: 90
    },

    // ===== EXERCISES 10-12: NUMBERS & SYMBOLS =====
    {
        id: 10,
        title: "Number Row Practice",
        description: "Reach up to the number row. Each finger is responsible for specific numbers: pinkies for 1 and 0, ring fingers for 2 and 9, etc.",
        targetLines: [
            "1234567890", "1234567890", "1234567890", "1234567890", "1234567890",
            "111 222 333", "444 555 666", "777 888 999", "000", "1234567890",
            "123 456 789", "147 258 369", "1234567890", "0987654321",
            "12 23 34 45", "56 67 78 89", "90 01 12", "1234567890",
            "the 5 quick brown foxes", "jump over 3 lazy dogs",
            "call me at 555 1234", "room 101 floor 2",
            "year 2024 day 15", "1234567890", "0987654321"
        ],
        keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        requiredAccuracy: 90
    },
    {
        id: 11,
        title: "Symbols and Shift Keys",
        description: "Hold shift with your pinky while pressing number keys to type symbols. Practice smooth shift key usage.",
        targetLines: [
            "!@#$%^&*()", "!@#$%^&*()", "!@#$%^&*()", "!@#$%^&*()", "!@#$%^&*()",
            "!!! @@@ ###", "$$$ %%% ^^^", "&&& *** (((", ")))", "!@#$%^&*()",
            "hello!", "wow!", "yes!", "no!", "stop!", "go!",
            "email@example.com", "user@test.org", "admin@site.net",
            "cost is $50", "discount 25%", "rate 3.5%", "total $100",
            "question?", "really?", "why?", "how?", "when?",
            "!@#$%^&*()", "symbols & numbers!", "100% correct!"
        ],
        keys: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
        requiredAccuracy: 90
    },
    {
        id: 12,
        title: "Mixed Alphanumeric Practice",
        description: "Combine letters, numbers, and symbols in realistic typing scenarios.",
        targetLines: [
            "The 5 quick brown foxes jump over 3 lazy dogs.",
            "Call me at (555) 123-4567 today!",
            "Email: user@example.com or admin@test.org",
            "Address: 123 Main St., Apt. 4B, City 56789",
            "Date: 01/15/2024 Time: 3:45 PM",
            "Price: $99.99 (save 20%!)",
            "Password: Secure@2024!",
            "Invoice #12345 - Total: $1,234.56",
            "Meeting Room 301 at 2:30 PM",
            "Version 2.5.1 released on 12/01/2023",
            "Score: 95/100 (Grade: A+)",
            "Contact: +1 (800) 555-0199"
        ],
        keys: ['all'],
        requiredAccuracy: 90
    },

    // ===== EXERCISES 13-15: ADVANCED PATTERNS =====
    {
        id: 13,
        title: "Capital Letters Practice",
        description: "Use shift key to capitalize letters. Hold shift with the pinky opposite to the letter you're typing.",
        targetLines: [
            "The Quick Brown Fox Jumps Over The Lazy Dog",
            "The Quick Brown Fox Jumps Over The Lazy Dog",
            "The Quick Brown Fox Jumps Over The Lazy Dog",
            "Monday Tuesday Wednesday Thursday Friday",
            "January February March April May June",
            "New York Los Angeles Chicago Houston Phoenix",
            "Apple Microsoft Google Amazon Facebook",
            "Hello World Welcome Home Good Morning",
            "United States United Kingdom European Union",
            "The Great Wall of China is Amazing",
            "Mount Everest is the Highest Peak",
            "Pacific Ocean Atlantic Ocean Indian Ocean",
            "Shakespeare wrote Romeo and Juliet",
            "Albert Einstein was a Genius Physicist",
            "The Internet Changed Everything Forever"
        ],
        keys: ['all'],
        requiredAccuracy: 90
    },
    {
        id: 14,
        title: "Punctuation Mastery",
        description: "Practice all punctuation marks in natural sentences. Focus on proper spacing and accuracy.",
        targetLines: [
            "Hello, world! How are you today?",
            "I'm fine, thank you. How about you?",
            "She said, \"I'll be there at 5:00 PM.\"",
            "The items are: apples, oranges, and bananas.",
            "Wait! Don't forget your keys, wallet, and phone.",
            "Is this correct? Yes, it is. Great!",
            "He asked, \"Where are we going?\"",
            "The answer is simple: practice, practice, practice.",
            "Wow! That's amazing. I can't believe it!",
            "Use these symbols: @, #, $, %, &, and *.",
            "The ratio is 3:1, which equals 75%.",
            "Dear Sir/Madam, I am writing to...",
            "P.S. Don't forget to reply A.S.A.P.",
            "The meeting (scheduled for 2 PM) was cancelled.",
            "Success = Hard Work + Smart Choices - Excuses."
        ],
        keys: ['all'],
        requiredAccuracy: 90
    },
    {
        id: 15,
        title: "Speed Building Paragraphs",
        description: "Type complete paragraphs to build fluency and speed. Maintain accuracy while increasing your natural typing rhythm.",
        targetLines: [
            "The art of typing is not just about speed. It is about accuracy, rhythm, and muscle memory.",
            "When you practice regularly, your fingers learn the patterns. They move automatically to the right keys.",
            "Good posture is essential for comfortable typing. Sit up straight with your feet flat on the floor.",
            "Keep your wrists elevated and relaxed. Do not rest them on the desk while typing.",
            "The home row is your anchor. Always return your fingers to their home positions between words.",
            "Touch typing allows you to focus on your thoughts rather than the keyboard. Your eyes stay on the screen.",
            "With practice, typing becomes second nature. You will type as naturally as you write by hand.",
            "Speed will come naturally as you build accuracy. Never sacrifice correctness for speed.",
            "Take breaks to avoid fatigue and strain. Stretch your fingers, hands, and wrists regularly.",
            "Congratulations! You have completed all 15 exercises. Keep practicing to maintain and improve your skills.",
            "Remember: consistent practice is the key to mastery. Type a little every day.",
            "You are now ready to tackle any typing challenge with confidence and skill!"
        ],
        keys: ['all'],
        requiredAccuracy: 90
    }
];
