let mediaRecorder;
let recordedChunks = [];

let selectedGradeLevel = '';
let selectedPillar = '';
let selectedGoal = '';
let isTailoredQuestions = true;

document.addEventListener('DOMContentLoaded', async () => {

    firebase.auth().onAuthStateChanged(async user => {

        if (user) {
            const openDashboardButton = document.getElementById('dashboard-button');
            const logoutButton = document.getElementById('logout-button');
            let cookie = getUserFromCookie();
            while (!cookie) {
                if (!cookie) {
                    await fetchUserAndCheckSubscription();
                }
                cookie = getUserFromCookie();
            }
            openDashboardButton.addEventListener('click', async () => { await openDashboard() });
            logoutButton.addEventListener('click', signout);

            const tailoredQuestions = document.getElementById('tailoredQuestions');
            const tailoredQuestionsLabel = document.getElementById('tailoredQuestionsLabel');
            const isSubscribed = (cookie.subscribed || false).toString() === 'true';
            if (isSubscribed) {
                tailoredQuestions.classList.remove('hidden');
                tailoredQuestionsLabel.classList.remove('hidden');
            } else {
                tailoredQuestions.classList.add('hidden');
                tailoredQuestionsLabel.classList.add('hidden');
            }
            tailoredQuestions.addEventListener('change', function () {
                isTailoredQuestions = tailoredQuestions.value === "yes";
            });
            const gradeLevelSelect = document.getElementById('gradeLevel');
            const pillarSelect = document.getElementById('pillar');
            const goalSelect = document.getElementById('goal');
            const continueBtn = document.getElementById('continueBtn');

            gradeLevelOptions.forEach(option => {
                let opt = document.createElement('option');
                opt.value = option;
                opt.textContent = option;
                gradeLevelSelect.appendChild(opt);
            });
            gradeLevelSelect.addEventListener('change', function () {
                selectedGradeLevel = gradeLevelSelect.value;
                const options = pillarOptions;
                populateDropdown(pillarSelect, options);
            });
            pillarSelect.addEventListener('change', function () {
                selectedPillar = pillarSelect.value;
                const options = goalOptionsMap[selectedPillar] || [];

                populateDropdown(goalSelect, options);
            });
            goalSelect.addEventListener('change', function () {
                selectedGoal = goalSelect.value;

            });
            [gradeLevelSelect, pillarSelect, goalSelect].forEach(select => {
                select.addEventListener('change', function () {
                    renderAdditionalOptions();
                    continueBtn.disabled = !(selectedGradeLevel && selectedPillar && selectedGoal);
                });
            });

            continueBtn.addEventListener('click', onContinue);
        }
    });
});

function renderAdditionalOptions() {
    const selectedGoal = document.getElementById('goal').value;
    const selectedPillar = document.getElementById('pillar').value;
    const additionalFieldsContainer = document.getElementById('additionalFields');
    additionalFieldsContainer.innerHTML = '';
    if (selectedPillar === 'Articulation' && selectedGoal) {
        if (selectedGoal === 'Consonant Clusters') {
            // Render multi-select checkboxes
            const checkboxes = multiSelectOptionsMap['consonant_clusters'].map(option => {
                return `<input type="checkbox" id="${option}" name="consonantClusters" value="${option}">
                        <label for="${option}">${option}</label><br>`;
            });
            additionalFieldsContainer.innerHTML = checkboxes.join('');
        } else if (selectedGoal === 'Letter Sounds') {
            // Render dropdown/select field
            const selectField = `<label for="letterSound">Select Sound:</label>
                                 <select id="letterSound" name="letterSound">
                                     <option value="">Select Sound</option>
                                     ${multiSelectOptionsMap['letter'].map(option => `<option value="${option}">${option}</option>`).join('')}
                                 </select><br>`;
            additionalFieldsContainer.innerHTML = selectField;
        }

        // Render common fields for Articulation
        const positionDropdown = `<label for="position">Select Position:</label>
                                  <select id="position" name="position">
                                      <option value="">Select Position</option>
                                      ${optionsMap['position'].map(option => `<option value="${option}">${option}</option>`).join('')}
                                  </select><br>`;
        additionalFieldsContainer.innerHTML += positionDropdown;

        const levelDropdown = `<label for="level">Select Level:</label>
                               <select id="level" name="level">
                                   <option value="">Select Level</option>
                                   ${optionsMap['word_sentence'].map(option => `<option value="${option}">${option}</option>`).join('')}
                               </select><br>`;
        additionalFieldsContainer.innerHTML += levelDropdown;

    } else if (selectedPillar === 'Expressive' && selectedGoal) {
        if (selectedGoal === 'Labeling') {
            // Render dropdown/select field
            const labelingTypeDropdown = `<label for="labelingType">Labeling Type:</label>
                                          <select id="labelingType" name="labelingType">
                                              <option value="">Select Labeling Type</option>
                                              ${optionsMap['labeling'].map(option => `<option value="${option}">${option}</option>`).join('')}
                                          </select><br>`;
            additionalFieldsContainer.innerHTML = labelingTypeDropdown;

            // Render additional dropdown if needed
            const activityDropdown = `<label for="activity">Select Activity:</label>
                                     <select id="activity" name="activity">
                                         <option value="">Select Activity</option>
                                         ${optionsMap['activity'].map(option => `<option value="${option}">${option}</option>`).join('')}
                                     </select><br>`;
            additionalFieldsContainer.innerHTML += activityDropdown;
        } else if (selectedGoal === 'Sequence') {
            // Render dropdown/select field
            const sequenceTypeDropdown = `<label for="sequenceType">Sequence Type:</label>
                                         <select id="sequenceType" name="sequenceType">
                                             <option value="">Select Sequence Type</option>
                                             ${optionsMap['sequence'].map(option => `<option value="${option}">${option}</option>`).join('')}
                                         </select><br>`;
            additionalFieldsContainer.innerHTML = sequenceTypeDropdown;

            // Render additional dropdown if needed
            const stepsDropdown = `<label for="steps">Number of Steps:</label>
                                  <select id="steps" name="steps">
                                      <option value="">Select Number of Steps</option>
                                      ${optionsMap['events'].map(option => `<option value="${option}">${option}</option>`).join('')}
                                  </select><br>`;
            additionalFieldsContainer.innerHTML += stepsDropdown;
        }
    }
    const continueBtn = document.getElementById('continueBtn');
    continueBtn.disabled = !(selectedGradeLevel && selectedPillar && selectedGoal);
}


function onContinue() {
    const formData = {
        gradeLevel: selectedGradeLevel,
        pillar: selectedPillar,
        goal: selectedGoal,
        letter: null,
        position: null,
        assimilation: null,
        pairDiscrim: null,
        desensitization: null,
        techniques: null,
        slowRate: null,
        conversation: null,
        labeling: null,
        activity: null,
        sequence: null,
        events: null,
        definition: null,
        marker: null,
        verb: null,
        tense: null,
        aux: null,
        morpheme: null,
        syntax: null,
        wh: null,
        conjunction: null,
        coordinating: null,
        subordination: null,
        narrative: null,
        storyElement: null,
        retelling: null,
        figurative: null,
        figurativeActivity: null,
        receptive: null,
        receptiveActivity: null,
        wordSentence: null,
        numberOfSyllables: null,
        deletionType: null,
        substitutionType: null,
        wordType: null,
        vocabularyActivity: null,
        steps: null,
        conceptType: null,
    };


    let params = new URLSearchParams(formData).toString();
    const isSubscribed = (getUserFromCookie().subscribed || false);

    params += `&subscribedUser=${isSubscribed.toString()}`;
    params += `&tailoredQuestions=${isTailoredQuestions.toString()}`;
    const url = `flashcards.html?${params}`;
    window.location.href = url;
}


function populateDropdown(selectElement, options) {
    selectElement.innerHTML = '<option value="">Select</option>'; // Clear previous options
    options.forEach(option => {
        let opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        selectElement.appendChild(opt);
    });
};

function signout() {
    showLoader();
    deleteUserCookie();
    firebase.auth().signOut()
        .then(() => {
            console.log('User signed out successfully');
            hideLoader();
            navigateTo('login.html');
        })
        .catch(error => {
            console.error('Error signing out:', error);
            hideLoader();
        });
}
async function fetchUserAndCheckSubscription() {
    try {
        showLoader();
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        const email = user.email;
        if (!uid || !email) {
            throw new Error('User not logged in');
            return;
        }
        const firebaseDoc = await fetchFirebaseData(uid);
        if (!firebaseDoc) {
            throw new Error('Error fetching user data from Firebase');
            return;
        }
        const subscribed = await isSubscribed(firebaseDoc.customerID);
        saveUserToCookie({ email: email, subscribed: subscribed, uid: uid, customerId: firebaseDoc.customerId });
        hideLoader();

    } catch (error) {
        console.error('Error fetching user and checking subscription:', error);
        navigateTo('login.html');
    }


}


async function openDashboard() {
    showLoader();
    const currentUser = firebase.auth().currentUser;
    const token = await fetchToken(currentUser.uid);
    if (!token) {
        hideLoader();
        console.error('Token not found');
        return;
    }
    hideLoader();
    const url = new URL("https://www.example.com");
    url.searchParams.append('token', token);
    window.open(url.href, '_blank');

    window.postMessage({ type: 'AUTH_TOKEN', token }, '*');
}

async function fetchToken(uid) {
    try {
        const response = await fetch('https://us-central1-speechbuddy-30390.cloudfunctions.net/createToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: uid
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error('There was a problem with the POST request:', error);
        return null;
    }
}



const gradeLevelOptions = [
    'Preschool', 'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade',
    '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade',
    '9th Grade', '10th Grade', '11th Grade', '12th Grade'
];

const goalOptionsMap = {
    'Articulation': ['Consonant Clusters', 'Letter Sounds'],
    'Expressive': [
        'Labeling',
        'Sequence',
        'Definitions',
        'Morphology',
        'Syntax',
        'Narrative',
        'Figurative Language'
    ],
    'Phonology': [
        'Multisyllabic Words',
        'Assimilation',
        'Minimal Pairs',
        'Substitution'
    ],
    'Receptive': ['Categories', 'Vocabulary', 'Following Directions'],
    'Pragmatic': ['Conversation'],
    'Fluency': ['Desensitization', 'Techniques']
};

const pillarOptions = [
    'Articulation',
    'Expressive',
    'Phonology',
    'Receptive',
    'Pragmatic',
    'Fluency'
];

const optionsMap = {
    'position': ['Initial', 'Medial', 'Final'],
    'word_sentence': ['Isolation', 'Word', 'Carrier Phrase', 'Sentence'],
    'assimilation': [
        'Labial',
        'Velar',
        'Nasal',
        'Denasalization',
        'Alveolar',
        'Devoicing',
        'Reduplication',
        'Consonant Deletion'
    ],
    'pair_discrim': [
        'Voicing',
        'Place',
        'Manner',
        'Stops vs Continuant',
        'Front vs Back',
        'High vs Low',
        'Tense vs Lax',
        'Nasal vs Oral',
        'Liquid vs Glide',
        'Consonant Clusters (Phonology)'
    ],
    'desensitization': ['Bumpy vs Smooth', 'Fast vs Slow'],
    'techniques': [
        'Cancellation',
        'Pull-out',
        'Preparatory Set',
        'Easy Onset',
        'Light Contact',
        'Slow Rate'
    ],
    'slow_rate': ['Word', 'Sentence', 'Reading', 'Conversation Topics'],
    'conversation': [
        'Ask Questions',
        'Conversation Topics',
        'Express Feelings'
    ],
    'labeling': ['Nouns', 'Colors', 'Quantity'],
    'activity': ['Fill in the Blanks', 'Create Sentences'],
    'sequence': ['Context', 'Story', 'Event'],
    'events': ['Three', 'Four', 'Five'],
    'definition': [
        'Context',
        'Multiple Meanings',
        'Fill in the Blank',
        'Multiple Choices',
        'Create Sentences'
    ],
    'marker': ['Verbs', 'Plurals', 'Possessive', 'Pronouns', 'Morphemes'],
    'verb': ['Tense', 'Auxillary Verbs'],
    'tense': ['Past', 'Present', 'Future', 'Progressive'],
    'aux': ['Regular', 'Irregular'],
    'morpheme': ['Prefix', 'Suffix'],
    'syntax': [
        'Yes/No Questions',
        'Wh- Questions',
        'Prepositional Phrases',
        'Synonyms and Antonyms',
        'Adjectives',
        'Subject-Verb Agreement',
        'Comparative',
        'Conjunctions'
    ],
    'wh': ['who', 'what', 'where', 'when', 'why', 'how'],
    'conjunction': ['Coordinating', 'Subordination'],
    'coordinating': ['For', 'And', 'Nor', 'But', 'Or', 'Yet', 'So'],
    'subordination': ['Although', 'Because', 'Since', 'Unless', 'While', 'If'],
    'narrative': ['Story Elements', 'Retelling'],
    'story_element': [
        'Character',
        'Setting',
        'Problem',
        'Solution',
        'Main Idea',
        'Supporting Details',
        'Theory of Mind',
        'Inferences',
        'Predictions'
    ],
    'retelling': ['Beginning', 'Middle', 'End'],
    'figurative': ['Idioms', 'Similes', 'Metaphors'],
    'figurative_activity': [
        'Meaning',
        'Fill in the Blanks',
        'Create Sentences'
    ],
    'receptive': [
        'Function',
        'Parts',
        'Location',
        'Similarities',
        'Differences'
    ],
    'receptive_activity': ['Describe', 'Compare and Contrast', 'List of 3'],
    'number_of_syllables': ['3+ Syllable', '5+ Syllable'],
    'deletion_type': ['Initial', 'Medial', 'Final', 'Weak Syllable'],
    'substitution_type': [
        'Fronting',
        'Backing',
        'Stopping',
        'Gliding',
        'Vowelization'
    ],
    'word_type': ['Nouns', 'Action Verbs', 'Adjectives'],
    'vocabulary_activity': [
        'Fill in the blank',
        'Definitions',
        'Create sentences'
    ],
    'steps': ['1-step', '2-step', '3-step'],
    'concept_type': [
        'Spatial',
        'Temporal',
        'Quantity',
        'Quality',
        'Pronouns',
        'Sequential',
        'Passive Voice',
        'Negatives'
    ]
};

const multiSelectOptionsMap = {
    'consonant_clusters': ['vocalic r', 'l', 's'],
    'letter': [
        'p',
        'm',
        'h',
        'w',
        'n',
        'b',
        'd',
        'j',
        'y',
        't',
        'k',
        'g',
        'ng',
        'f',
        'ch',
        'r',
        'l',
        'v',
        'th',
        'th (theta)',
        'z',
        's',
        'sh',
        'vocalic r'
    ],
};