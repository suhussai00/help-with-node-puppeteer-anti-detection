const { execSync } = require('child_process');

const installDependencies = () => {
  try {
    // Install Puppeteer, Puppeteer-Extra, Puppeteer-Extra-Plugin-Stealth, and chromeLocation
    execSync('npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth chrome-location', { stdio: 'inherit' });
    console.log('Puppeteer, Puppeteer-Extra, Puppeteer-Extra-Plugin-Stealth, and chromeLocation installed successfully.');

    // Now you can require Puppeteer, Puppeteer-Extra, and Puppeteer-Extra-Plugin-Stealth in your script
    const puppeteer = require('puppeteer');
    const puppeteerExtra = require('puppeteer-extra');
    const stealthPlugin = require('puppeteer-extra-plugin-stealth');
    const chromeLocation = require('chrome-location');
    const fs = require('fs');

    // Register the stealth plugin
    puppeteerExtra.use(stealthPlugin());

    // Your Puppeteer code here...
    main(puppeteer, puppeteerExtra, chromeLocation, fs);

  } catch (error) {
    console.error('Error installing or using dependencies:', error.message);
  }
};

// Pull a random first name from a list of first names
async function getRandomFirstName(fs) {
  const data = fs.readFileSync('first-names.txt', 'utf8');
  const names = data.split('\n');
  const randomName = names[Math.floor(Math.random() * names.length)];
  return randomName.trim();
}

// Pull a random last name from a list of last names with the first letter capitalized and the rest lowercase
async function getRandomLastName(fs) {
  const data = fs.readFileSync('last-names.txt', 'utf8');
  const names = data.split('\n');
  const randomName = names[Math.floor(Math.random() * names.length)];

  // Capitalize the first letter and make the rest lowercase
  const formattedLastName = randomName.charAt(0).toUpperCase() + randomName.slice(1).toLowerCase();

  return formattedLastName.trim();
}

const generateRandomNumbers = () => {
  return Math.floor(Math.random() * 90000) + 10000; // Generates a random 5-digit number
};

const generateRandomSymbol = () => {
  const symbols = '!@#$%^&*()_-+=<>?';
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generateRandomPassword = () => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const password =
    letters.charAt(Math.floor(Math.random() * letters.length)).toUpperCase() +
    letters.charAt(Math.floor(Math.random() * letters.length)) +
    letters.charAt(Math.floor(Math.random() * letters.length)) +
    letters.charAt(Math.floor(Math.random() * letters.length)) +
    letters.charAt(Math.floor(Math.random() * letters.length)) +
    generateRandomNumbers(4) +
    generateRandomSymbol();
  return password;
};

const createGmailAddress = (firstName, lastName) => {
  const randomNumbers = generateRandomNumbers();
  return `${firstName}.${lastName}${randomNumbers}`;
};

const main = async (puppeteer, puppeteerExtra, chromeLocation, fs) => {
  try {

    
    // Use Puppeteer and Puppeteer-Extra as needed
    const browser = await puppeteer.launch({ headless: false, executablePath: chromeLocation });
    const page = await browser.newPage();

    //Setting page
    await page.setViewport({ width: 1280, height: 720 });

    // Set a realistic User Agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // Your Puppeteer code here...
    await page.goto('https://gmail.com');

    // Wait for the button to be available
    await page.waitForSelector('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.ksBjEc.lKxP2d.LQeN7.FliLIb.uRo0Xe.TrZEUc.Xf9GD', { visible: true, timeout: 10000 });

    // Click the button
    await page.click('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.ksBjEc.lKxP2d.LQeN7.FliLIb.uRo0Xe.TrZEUc.Xf9GD');

    // Wait for the span element to be available
    await page.waitForSelector('span.VfPpkd-StrnGf-rymPhb-b9t22c', { visible: true, timeout: 10000 });

    // Click the span element
    await page.click('span.VfPpkd-StrnGf-rymPhb-b9t22c'); 

    // Wait for the input field for the first name to be available
    await page.waitForSelector('input#firstName', { visible: false, timeout: 10000 });

    // Get a random first name
    const randomFirstName = await getRandomFirstName(fs);

    // Type the random first name into the input field
    await page.type('input#firstName', randomFirstName);

    // Wait for the input field for the last name to be available
    await page.waitForSelector('input#lastName', { visible: true, timeout: 10000 });

    // Get a random last name
    const randomLastName = await getRandomLastName(fs);

    // Type the random last name into the input field
    await page.type('input#lastName', randomLastName);

    // Wait for the "Next" button to be available
    await page.waitForSelector('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ span.VfPpkd-vQzf8d', { visible: true, timeout: 10000 });

    // Click the "Next" button
    await page.click('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ span.VfPpkd-vQzf8d');

    // Assuming you want to select the month of January (value="1")
    const monthValue = "1";

    // Wait for the select element to be available
    await page.waitForSelector('select.UDCCJb[jsname="YPqjbf"]', { visible: true, timeout: 10000 });

    // Select the specified month
    await page.select('select.UDCCJb[jsname="YPqjbf"]', monthValue);

    // Wait for the input field for the day to be available
    await page.waitForSelector('input.whsOnd.zHQkBf[jsname="YPqjbf"][aria-label="Day"]', { visible: true, timeout: 10000 });

    // Input the value "1" into the day input field
    await page.type('input.whsOnd.zHQkBf[jsname="YPqjbf"][aria-label="Day"]', '1');

    // Wait for the input field for the year to be available
    await page.waitForSelector('input.whsOnd.zHQkBf[jsname="YPqjbf"][aria-label="Year"]', { visible: true, timeout: 10000 });

    // Input the value "1990" into the year input field
    await page.type('input.whsOnd.zHQkBf[jsname="YPqjbf"][aria-label="Year"]', '1990');

    // Wait for the select element for gender to be available
    await page.waitForSelector('select.UDCCJb[jsname="YPqjbf"][aria-labelledby="gender-label"]', { visible: true, timeout: 10000 });

    // Select the "Male" option
    await page.select('select.UDCCJb[jsname="YPqjbf"][aria-labelledby="gender-label"]', '1');

    // Wait for the "Next" button to be available
    await page.waitForSelector('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ span.VfPpkd-vQzf8d', { visible: true, timeout: 10000 });

    // Click the "Next" button using page.evaluate
    await page.evaluate(() => {
      document.querySelector('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ span.VfPpkd-vQzf8d').click();
    });

    // Wait for the option to be available
    await page.waitForSelector('div#selectioni3.jGAaxb[jsname="CeL6Qc"]', { visible: true, timeout: 10000 });

    // Click the "Create your own Gmail address" option
    await page.click('div#selectioni3.jGAaxb[jsname="CeL6Qc"]');

    // Wait for the input field to be available
    await page.waitForSelector('input.whsOnd.zHQkBf[jsname="YPqjbf"][aria-label="Create a Gmail address"]', { visible: true, timeout: 10000 });

    // Create Gmail address using the same first and last names
    const gmailAddress = createGmailAddress(randomFirstName, randomLastName);

    // Type the Gmail address into the input field
    await page.type('input.whsOnd.zHQkBf[jsname="YPqjbf"][aria-label="Create a Gmail address"]', gmailAddress);

    // Wait for the "Next" button to be available
    await page.waitForSelector('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ span.VfPpkd-vQzf8d', { visible: true, timeout: 10000 });

    // Click the "Next" button using page.evaluate
    await page.evaluate(() => {
      document.querySelector('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ span.VfPpkd-vQzf8d').click();
    });

    // Wait for the password input field to be available
    await page.waitForSelector('input.whsOnd.zHQkBf[jsname="YPqjbf"][aria-label="Password"]', { visible: true, timeout: 10000 });

    // Generate a random password
    const randomPassword = generateRandomPassword();

// Type the password into the password input field
await page.type('input.whsOnd.zHQkBf[jsname="YPqjbf"][aria-label="Password"]', randomPassword);

// Type the password into the confirm password field
await page.type('input.whsOnd.zHQkBf[jsname="YPqjbf"][aria-label="Confirm"]', randomPassword);

// Wait for the "Next" button to be available
    await page.waitForSelector('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ span.VfPpkd-vQzf8d', { visible: true, timeout: 10000 });

    // Click the "Next" button using page.evaluate
    await page.evaluate(() => {
      document.querySelector('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ span.VfPpkd-vQzf8d').click();
    });

  } catch (error) {
    console.error('Error in main function:', error.message);
  }
};

// Call the installDependencies function
installDependencies();

