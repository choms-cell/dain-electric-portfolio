"use client";

import { useState, useRef, useCallback } from "react";

export default function UploadPage() {
  const [password, setPassword] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [resultCount, setResultCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(e.target.files ?? []));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return;

    setStatus("uploading");
    setErrorMsg("");

    const formData = new FormData();
    formData.append("password", password);
    files.forEach((f) => formData.append("files", f));

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "업로드 실패");
        setStatus("error");
        return;
      }

      setResultCount(data.count);
      setStatus("done");
    } catch {
      setErrorMsg("네트워크 오류가 발생했습니다.");
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setFiles([]);
    setErrorMsg("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white border border-slate-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200">
          <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400 mb-1">
            Admin
          </p>
          <h1 className="font-bold text-slate-900 text-[18px]">사진 업로드</h1>
          <p className="text-[12px] text-slate-500 mt-1">
            Sanity 미디어 라이브러리에 바로 저장됩니다.
          </p>
        </div>

        <div className="px-6 py-6">
          {status === "done" ? (
            <div className="text-center">
              <div className="w-12 h-12 bg-slate-900 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-bold text-slate-900 text-[16px] mb-1">
                {resultCount}장 업로드 완료
              </p>
              <p className="text-[12px] text-slate-500 mb-6">
                스튜디오 → Media 탭에서 확인하세요.
              </p>
              <button
                onClick={reset}
                className="w-full py-3 bg-slate-900 text-white font-bold text-[13px] hover:bg-slate-700 transition-colors"
              >
                추가 업로드
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Password */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                  비밀번호
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="관리자 비밀번호"
                  className="w-full px-3.5 py-2.5 border border-slate-200 text-[13px] text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-slate-900 transition-colors"
                />
              </div>

              {/* File picker */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                  사진 선택
                </label>
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-200 cursor-pointer hover:border-slate-400 transition-colors">
                  <svg className="w-7 h-7 text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[12px] text-slate-500">
                    {files.length > 0 ? `${files.length}장 선택됨` : "탭하여 사진 선택 (여러 장 가능)"}
                  </span>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFiles}
                    className="sr-only"
                  />
                </label>
                {files.length > 0 && (
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    {files.map((f) => f.name).join(", ")}
                  </p>
                )}
              </div>

              {/* Error */}
              {status === "error" && (
                <p className="text-[12px] text-red-500 text-center">{errorMsg}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "uploading" || files.length === 0}
                className="w-full py-3.5 bg-slate-900 text-white font-bold text-[13px] hover:bg-slate-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {status === "uploading"
                  ? `업로드 중... (잠시 기다려주세요)`
                  : `${files.length > 0 ? `${files.length}장` : ""} 업로드`}
              </button>

              <p className="text-[10px] text-slate-400 text-center">
                업로드 후 스튜디오에서 포트폴리오에 연결하세요
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
