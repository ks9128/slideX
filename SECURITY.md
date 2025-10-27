# Security Policy

## Supported Versions

Currently, SlideX is in active development. Security updates are provided for the latest version only.

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within SlideX, please send an email to [INSERT EMAIL ADDRESS] with the subject line "SlideX Security Vulnerability Report".

Please include the following information in your report:

- Description of the vulnerability
- Steps to reproduce the vulnerability
- Potential impact of the vulnerability
- Any possible mitigations you've identified

We ask that you give us a reasonable amount of time to address the vulnerability before disclosing it publicly.

## Security Considerations

SlideX follows several security best practices:

1. **Authentication**: Uses Clerk for secure user authentication
2. **Data Storage**: Firebase Firestore with proper security rules
3. **Environment Variables**: Sensitive keys stored in environment variables
4. **Dependency Management**: Regular updates to address known vulnerabilities
5. **Input Validation**: Proper validation of user inputs
6. **Secure Communication**: HTTPS encryption for all network communications

## Best Practices for Contributors

If you're contributing to SlideX, please follow these security best practices:

1. Never commit sensitive information (API keys, passwords, etc.) to the repository
2. Use environment variables for configuration
3. Validate and sanitize all user inputs
4. Keep dependencies up to date
5. Follow the principle of least privilege
6. Review security documentation before implementing new features
