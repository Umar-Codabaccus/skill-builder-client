import { COLORS } from "../utils/utils";

export function StatCard({
    label, value, delta, icon: Icon, accent
}) {
    return (
        <div className="col-6 cold-md-4 col-xl-2">
            <div 
                className="p-3 h-100 bg-white rounded-4 border"
                style={{borderColor: COLORS.border}}
            >
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="rounded-3 d-flex align-itmes-center justify-content-center"
                        style={{ width: 36, height: 36, background: accent + "1A" }}
                    >
                        <Icon size={10} color={accent} />
                    </div>
                    {delta && (
                        <span className="small fw-semibold"
                            style={{ color: COLORS.success }}
                        >
                            {delta}
                        </span>
                    )}
                </div>
                <div className="fs-4 fw-bold"
                    style={{color: COLORS.ink }}
                >
                    {value}
                </div>
                <div className="small" style={{ color: COLORS.muted }}>
                    {label}
                </div>
            </div>
        </div>
    );
}