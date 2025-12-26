import type { ResourceWithAuthor, CitationFormat } from '../types/library';

export function generateCitations(resource: ResourceWithAuthor): CitationFormat {
  const author = resource.author?.full_name || 'Unknown Author';
  const title = resource.title;
  const year = resource.publication_year || 'n.d.';
  const publisher = resource.publisher || 'Publisher Unknown';

  const authorLastName = author.split(' ').pop() || author;
  const authorFirstInitials = author
    .split(' ')
    .slice(0, -1)
    .map(name => name.charAt(0) + '.')
    .join(' ');

  const apa = `${authorLastName}, ${authorFirstInitials} (${year}). <em>${title}</em>. ${publisher}.`;

  const mla = `${author}. <em>${title}</em>. ${publisher}, ${year}.`;

  const chicago = `${author}. <em>${title}</em>. ${publisher}, ${year}.`;

  const bibtex = `@book{${authorLastName}${year},
  author = {${author}},
  title = {${title}},
  publisher = {${publisher}},
  year = {${year}}
}`;

  return { apa, mla, chicago, bibtex };
}

export function copyToClipboard(text: string): Promise<void> {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = text;
  const plainText = tempDiv.textContent || tempDiv.innerText || '';

  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(plainText);
  }

  const textArea = document.createElement('textarea');
  textArea.value = plainText;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  } finally {
    document.body.removeChild(textArea);
  }
}
