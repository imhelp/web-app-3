import React, { useState } from "react";
import MenuCard from "./MenuCard";
import "./TopMenu.css";

function TopMenu() {

    const initialTotalMenuList = [
        { id: 1, name: "돈까스", price: "5000원", store: "가게명1" },
        { id: 2, name: "제육볶음", price: "4000원", store: "가게명1" },
        { id: 3, name: "치즈라면", price: "7000원", store: "가게명2" },
        { id: 4, name: "김치찌개", price: "6500원", store: "가게명2" },
        { id: 5, name: "짜장면", price: "5500원", store: "가게명3" },
        { id: 6, name: "된장찌개", price: "6000원", store: "가게명3" },
        { id: 7, name: "돌솥비빔밥", price: "8000원", store: "가게명4" },
        { id: 8, name: "잔치국수", price: "4500원", store: "가게명4" },
    ];

    const [selections, setSelections] = useState({});
    const [sortBy, setSortBy] = useState("popular");
    const [selectedStore, setSelectedStore] = useState("전체");

    const handleSelect = (menuId, category, value) => {
        setSelections((prev) => ({
            ...prev,
            [menuId]: {
                ...prev[menuId],
                [category]: prev[menuId]?.[category] === value ? null : value,
            },
        }));
    };

    const parsePrice = (priceStr) => parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 0;

    const getTop3Menus = () => {
        const filtered = initialTotalMenuList.filter(
            (item) => selectedStore === "전체" || item.store === selectedStore
        );
        return filtered
            .sort((a, b) => {
                const aR = selections[a.id]?.recommend ? 1 : 0;
                const bR = selections[b.id]?.recommend ? 1 : 0;
                return bR - aR;
            })
            .slice(0, 3);
    };

    const getFilteredAndSortedList = () => {
        let result = initialTotalMenuList.filter(
            (item) => selectedStore === "전체" || item.store === selectedStore
        );
        return result.sort((a, b) => {
            if (sortBy === "popular") {
                const aR = selections[a.id]?.recommend ? 1 : 0;
                const bR = selections[b.id]?.recommend ? 1 : 0;
                return bR - aR;
            }
            if (sortBy === "priceLow") return parsePrice(a.price) - parsePrice(b.price);
            if (sortBy === "priceHigh") return parsePrice(b.price) - parsePrice(a.price);
            return 0;
        });
    };

    return (
        <div className="menu-body">
            <div className="menu-inner">

                {/* 필터 바 */}
                <div className="menu-filter-bar">
                    <div className="Store">
                        {["전체", "가게명1", "가게명2", "가게명3", "가게명4"].map((storeName) => (
                            <button
                                key={storeName}
                                className={selectedStore === storeName ? "active-store" : ""}
                                onClick={() => setSelectedStore(storeName)}
                            >
                                {storeName}
                            </button>
                        ))}
                    </div>
                    <select className="Sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="popular">인기순</option>
                        <option value="priceLow">가격 낮은 순</option>
                        <option value="priceHigh">가격 높은 순</option>
                    </select>
                </div>

                {/* 인기메뉴 TOP3 */}
                <div className="Menu">
                    <h3>인기메뉴 TOP3</h3>
                    <div className="Menu-List-Wrapper">
                        {getTop3Menus().map((menu, index) => (
                            <MenuCard
                                key={menu.id}
                                item={menu}
                                rank={`인기 ${index + 1}위`}
                                selections={selections}
                                onSelect={handleSelect}
                            />
                        ))}
                        {getTop3Menus().length === 0 && (
                            <p style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>등록된 메뉴가 없습니다.</p>
                        )}
                    </div>
                </div>

                {/* 전체 메뉴 */}
                <div className="All-Menu-Section">
                    <h3>전체 메뉴</h3>
                    <div className="All-Menu-Grid">
                        {getFilteredAndSortedList().map((item) => (
                            <MenuCard
                                key={item.id}
                                item={item}
                                rank={null}
                                selections={selections}
                                onSelect={handleSelect}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default TopMenu;
