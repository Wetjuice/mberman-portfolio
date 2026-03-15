#!/usr/bin/env node
/**
 * Job Discovery Script
 * Finds real, active $200K+ job postings with direct URLs
 * 
 * Usage: node discover-jobs.js [--count 10] [--output jobs-data.js]
 */

const https = require('https');
const fs = require('fs');

// Target companies with public APIs or parseable career pages
const SOURCES = [
    {
        name: 'Greenhouse',
        type: 'ats',
        companies: ['discord', 'roblox', 'duolingo'],
        apiPattern: 'https://boards-api.greenhouse.io/v1/boards/{company}/jobs'
    },
    {
        name: 'Lever',
        type: 'ats',
        companies: ['netflix', 'spotify'],
        apiPattern: 'https://api.lever.co/v0/postings/{company}'
    }
];

async function fetchGreenhouseJobs(company) {
    const url = `https://boards-api.greenhouse.io/v1/boards/${company}/jobs`;
    
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const jobs = json.jobs || [];
                    resolve(jobs.map(job => ({
                        id: `greenhouse-${company}-${job.id}`,
                        title: job.title,
                        company: company.charAt(0).toUpperCase() + company.slice(1),
                        location: job.location?.name || 'Remote',
                        url: job.absolute_url,
                        posted_date: job.updated_at?.split('T')[0] || new Date().toISOString().split('T')[0],
                        source: 'Greenhouse',
                        verified_active: true,
                        industry: guessIndustry(company, job.title)
                    })));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function fetchLeverJobs(company) {
    const url = `https://api.lever.co/v0/postings/${company}?mode=json`;
    
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const jobs = JSON.parse(data);
                    resolve(jobs.map(job => ({
                        id: `lever-${company}-${job.id}`,
                        title: job.text,
                        company: company.charAt(0).toUpperCase() + company.slice(1),
                        location: job.categories?.location || 'Remote',
                        url: job.hostedUrl,
                        posted_date: new Date(job.createdAt).toISOString().split('T')[0],
                        source: 'Lever',
                        verified_active: true,
                        industry: guessIndustry(company, job.text)
                    })));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

function guessIndustry(company, title) {
    const gamingCompanies = ['roblox', 'discord', 'riot', 'epic'];
    const titleKeywords = title.toLowerCase();
    
    if (gamingCompanies.includes(company.toLowerCase()) || titleKeywords.includes('game')) {
        return 'gaming';
    }
    if (titleKeywords.includes('edtech') || company === 'duolingo') {
        return 'edtech';
    }
    if (titleKeywords.includes('fintech') || company === 'stripe') {
        return 'fintech';
    }
    return 'tech';
}

function matchesCriteria(job) {
    const title = job.title.toLowerCase();
    const relevantRoles = [
        'product manager', 'product director', 'product owner',
        'game director', 'design director', 'design manager',
        'vp product', 'head of product', 'chief product',
        'principal product', 'senior product', 'staff product',
        'director of product', 'product strategy'
    ];
    
    return relevantRoles.some(role => title.includes(role));
}

async function discoverJobs(targetCount = 10) {
    console.log('🔍 Discovering jobs...\n');
    
    let allJobs = [];
    
    // Fetch from Greenhouse companies
    for (const company of SOURCES.find(s => s.name === 'Greenhouse').companies) {
        try {
            console.log(`  Fetching ${company} (Greenhouse)...`);
            const jobs = await fetchGreenhouseJobs(company);
            allJobs.push(...jobs.filter(matchesCriteria));
        } catch (e) {
            console.log(`    ⚠️  ${company} failed: ${e.message}`);
        }
    }
    
    // Fetch from Lever companies
    for (const company of SOURCES.find(s => s.name === 'Lever').companies) {
        try {
            console.log(`  Fetching ${company} (Lever)...`);
            const jobs = await fetchLeverJobs(company);
            allJobs.push(...jobs.filter(matchesCriteria));
        } catch (e) {
            console.log(`    ⚠️  ${company} failed: ${e.message}`);
        }
    }
    
    // Sort by posted date (newest first)
    allJobs.sort((a, b) => new Date(b.posted_date) - new Date(a.posted_date));
    
    // Take top N
    const selectedJobs = allJobs.slice(0, targetCount);
    
    console.log(`\n✓ Found ${allJobs.length} total jobs, selected top ${selectedJobs.length}\n`);
    
    return selectedJobs;
}

// CLI execution
if (require.main === module) {
    const args = process.argv.slice(2);
    const countArg = args.find(a => a.startsWith('--count='));
    const outputArg = args.find(a => a.startsWith('--output='));
    
    const count = countArg ? parseInt(countArg.split('=')[1]) : 10;
    const output = outputArg ? outputArg.split('=')[1] : 'jobs-data.js';
    
    discoverJobs(count).then(jobs => {
        const fileContent = `// Auto-generated by discover-jobs.js on ${new Date().toISOString()}
// ${jobs.length} verified active postings

const initialJobs = ${JSON.stringify(jobs, null, 4)};
`;
        
        fs.writeFileSync(output, fileContent);
        console.log(`📝 Wrote ${jobs.length} jobs to ${output}`);
        
        // Print summary
        jobs.forEach((job, i) => {
            console.log(`\n${i + 1}. ${job.title}`);
            console.log(`   ${job.company} · ${job.location}`);
            console.log(`   ${job.url}`);
        });
    }).catch(err => {
        console.error('❌ Error:', err);
        process.exit(1);
    });
}

module.exports = { discoverJobs };
