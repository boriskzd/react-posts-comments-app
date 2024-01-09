import "./Search.css";

interface SearchProps {
	handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
	searchText: string;
}

export default function Search({ handleSearch, searchText }: SearchProps) {
	return (
		<div className="search-container">
			<input
				type="text"
				id="search"
				value={searchText}
				placeholder="Search..."
				onChange={handleSearch}
			/>
		</div>
	);
}
