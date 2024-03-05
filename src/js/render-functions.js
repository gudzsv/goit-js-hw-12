import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function renderGallery(data, tagToInsert) {
  tagToInsert.innerHTML = markup(data);

  lightbox.refresh();
}

function markup(data) {
  return data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
				<li class="gallery-item hvr-grow">
					<a class="gallery-link" href="${largeImageURL}">
						<figure class="gallery-figure ">
							<img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy">
							<figcaption class="gallery-figcaption">
								<ul class="img-content-wrapper">
									<li>Likes<span>${likes}</span></li>
									<li>Views<span>${views}</span></li>
									<li>Comments<span>${comments}</span></li>
									<li>Downloads<span>${downloads}</span></li>
								</ul>
							</figcaption>
						</figure>
					</a>
				</li>
		`
    )
    .join('');
}
