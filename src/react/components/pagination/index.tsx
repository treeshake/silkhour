
type PaginationPart = {
  title: number | string;
  url?: string;
  is_link: boolean;
};

type Pagination = {
  current_offset: number;
  current_page: number;
  items: number;
  page_size: number;
  parts: PaginationPart[];
  next?: PaginationPart;
  previous?: PaginationPart;
  pages: number;
};

export function Pagination({
  paginate,
  anchor,
}: {
  paginate: Pagination;
  anchor?: string;
}) {
  return (
    <ul className="pagination__list list-unstyled" role="list">
      {paginate.previous && (
        <li>
          <a
            href={`${paginate.previous.url}${anchor}`}
            className="pagination__item pagination__item--next pagination__item-arrow link motion-reduce"
            aria-label="Previous"
          >
            <span className="svg-wrapper">
              {/* Replace with actual SVG content */}
              &lt;
            </span>
          </a>
        </li>
      )}

      {paginate.parts.map((part, index) => (
        <li key={index}>
          {part.is_link ? (
            <a
              href={`${part.url}${anchor}`}
              className="pagination__item link"
              aria-label={`Page ${part.title}`}
            >
              {part.title}
            </a>
          ) : part.title === paginate.current_page ? (
            <a
              role="link"
              aria-disabled="true"
              className="pagination__item pagination__item--current light"
              aria-current="page"
              aria-label={`Page ${part.title}`}
            >
              {part.title}
            </a>
          ) : (
            <span className="pagination__item">{part.title}</span>
          )}
        </li>
      ))}

      {paginate.next && (
        <li>
          <a
            href={`${paginate.next.url}${anchor}`}
            className="pagination__item pagination__item--prev pagination__item-arrow link motion-reduce"
            aria-label="Next"
          >
            <span className="svg-wrapper">
              {/* Replace with actual SVG content */}
              &gt;
            </span>
          </a>
        </li>
      )}
    </ul>
  );
}
