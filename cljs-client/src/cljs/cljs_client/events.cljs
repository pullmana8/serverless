(ns cljs-client.events
  (:require
   [re-frame.core :as re-frame]
   [cljs-client.db :as db]
   ))

(re-frame/reg-event-db
 ::initialize-db
 (fn [_ _]
   db/default-db))
